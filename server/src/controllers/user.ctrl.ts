import { Request, Response } from 'express';
import fs from 'fs';
import Jimp from 'jimp';
import { merge, pick } from 'lodash';
import { ObjectId } from 'mongodb';
import winston from 'winston';
import { FixMeLater } from '..';
import { profileSchema } from '../models/profile.model';
import { Tweet } from '../models/tweet.model';
import { User } from '../models/user.model';
import { config } from '../startup/config';

const { imageAssetsPath } = config;

function getUserResponse(userDoc: User) {
  const result = pick(userDoc, [
    'name',
    'handle',
    'location',
    'website',
    'followingCount',
    'followerCount',
  ]);
  result.joinDate = new ObjectId(userDoc._id).getTimestamp();

  // if (userDoc.profileImage) {
  //   const { mimetype, data } = userDoc.profileImage;
  //   result.profileImageSrc = `data:${mimetype};base64,${data.toString('base64')}`;
  // }

  return result;
}

export const getUser: FixMeLater = async (_req: Request, res: Response) => {
  const { id } = res.locals.auth.token;
  const { db } = res.app.locals;
  let user;
  try {
    user = await db.users.findOne({ _id: id });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }

  if (user) {
    return res.send(getUserResponse(user));
  }
  return res.status(404).send('user not found');
};

export const getUserByHandle: FixMeLater = async (req: Request, res: Response) => {
  const { handle } = req.params;
  if (!handle) return res.status(400).send('handle is required');

  const { db } = res.app.locals;
  let user;
  try {
    user = await db.users.findOne({ handle });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }

  if (user) {
    return res.send(getUserResponse(user));
  }
  return res.status(404).send('user not found');
};

// TODO make this a transaction somehow to ensure images and profile data stay
// synched
export const updateProfile: FixMeLater = async (req: Request, res: Response) => {
  const { id } = res.locals.auth.token;
  const { db } = res.app.locals;

  const { error } = profileSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const filter = { _id: id };

  const user = await db.users.findOne(filter);
  if (!user) return res.status(400).send('User not found');

  const userUpdates = merge({}, user, req.body);

  const doc = await db.users.findOneAndReplace(filter, userUpdates, { returnOriginal: false });
  if (doc.value === undefined) {
    return res.status(500).send('An issue occurred during update.');
  }

  // rename profile images if handle has changed
  if (user.handle !== userUpdates.handle) {
    try {
      fs.renameSync(
        `${imageAssetsPath}${user.handle}.jpg`,
        `${imageAssetsPath}${userUpdates.handle}.jpg`,
      );
      fs.renameSync(
        `${imageAssetsPath}${user.handle}-banner.jpg`,
        `${imageAssetsPath}${userUpdates.handle}-banner.jpg`,
      );
    } catch (e) {
      winston.error(e);
    }
  }

  if (req.files) {
    const { profileImage, bannerImage } = req.files;

    if (profileImage && !Array.isArray(profileImage)) {
      try {
        const img = await Jimp.read(profileImage.data);
        await img.scaleToFit(256, 256).write(`${imageAssetsPath}${userUpdates.handle}.jpg`);
      } catch (e) {
        winston.error(e);
      }
    }

    if (bannerImage && !Array.isArray(bannerImage)) {
      try {
        const bannerImg = await Jimp.read(bannerImage.data);
        await bannerImg
          .scaleToFit(1920, 1080)
          .write(`${imageAssetsPath}${userUpdates.handle}-banner.jpg`);
      } catch (e) {
        winston.error(e);
      }
    }
  }

  return res.send(getUserResponse(doc.value));
};

// need to make this function a transaction
export const follow: FixMeLater = async (req: Request, res: Response) => {
  const { handle } = res.locals.auth.token;
  const { handle: toFollow } = req.query;
  const { db } = res.app.locals;

  let currUser: User | null;
  let followee: User | null;
  try {
    currUser = await db.users.findOne({ handle });
    followee = await db.users.findOne({ handle: toFollow });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }

  if (currUser === null) return res.status(400).send('handle not found');
  if (followee === null) return res.status(400).send('handle to follow not found');

  currUser = new User(currUser);
  followee = new User(followee);

  const following = new Set(currUser.following);
  const followers = new Set(followee.followers);
  if (currUser.following.includes(toFollow)) {
    // need to unfollow
    following.delete(toFollow);
    followers.delete(handle);
  } else {
    // need to follow
    following.add(toFollow);
    followers.add(handle);
  }

  try {
    await db.users.findOneAndUpdate(
      { handle },
      {
        $set: {
          following: Array.from(following),
        },
      },
    );
    await db.users.findOneAndUpdate(
      { handle: toFollow },
      { $set: { followers: Array.from(followers) } },
    );
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }

  return res.send({ following });
};

// need to make this function a transaction
export const toggleFavoriteTweet: FixMeLater = async (req: Request, res: Response) => {
  const { id } = res.locals.auth.token;
  const tweetId = new ObjectId(String(req.query.tweet));
  const { db } = res.app.locals;

  let user: User | null;
  let tweet: Tweet | null;
  try {
    user = await db.users.findOne({ _id: id });
    tweet = await db.tweets.findOne({ _id: tweetId });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }

  if (user === null) return res.status(400).send('user not found');
  if (tweet === null) return res.status(400).send('tweet not found');

  tweet = new Tweet({ ...tweet, _id: tweetId });

  const favoriteTweets = new Set(user.favoriteTweets?.map(String));
  const favoritedBy = new Set(tweet.favoritedBy.map(String));
  if (favoriteTweets.has(tweetId.toString())) {
    favoriteTweets.delete(tweetId.toString());
    favoritedBy.delete(id.toString());
  } else {
    favoriteTweets.add(tweetId.toString());
    favoritedBy.add(id.toString());
  }

  try {
    const userOp = await db.users.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          favoriteTweets: [...favoriteTweets].map((ft) => new ObjectId(ft)),
        },
      },
      { returnOriginal: false },
    );
    await db.tweets.findOneAndUpdate(
      { _id: tweetId },
      {
        $set: {
          favoritedBy: [...favoritedBy].map((fb) => new ObjectId(fb)),
        },
      },
      { returnOriginal: false },
    );
    return res.send({ favoriteTweets: userOp.value?.favoriteTweets });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }
};

export const getUserLikes: FixMeLater = async (req: Request, res: Response) => {
  const { handle } = req.query;
  if (!handle) return res.status(400).send('handle is required');

  const { db } = res.app.locals;

  try {
    const user = await db.users.findOne({ handle });
    if (!user) return res.status(400).send('user not found');

    const pipeline = [
      { $match: { handle } },
      { $project: { favoriteTweets: 1 } },
      {
        $unwind: {
          path: '$favoriteTweets',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'tweets',
          localField: 'favoriteTweets',
          foreignField: '_id',
          as: 'tweet',
        },
      },
      {
        $unwind: {
          path: '$tweet',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'tweet.creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      {
        $unwind: {
          path: '$creator',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $sort: {
          'tweet.createdAt': -1,
        },
      },
      {
        $group: {
          _id: '$_id',
          tweets: {
            $push: {
              id: '$tweet._id',
              createdAt: '$tweet.createdAt',
              body: '$tweet.body',
              creatorHandle: '$creator.handle',
              creatorName: '$creator.name',
            },
          },
        },
      },
    ];
    type UserLikes = {
      _id: ObjectId;
      tweets: [
        {
          id: ObjectId;
          createdAt: Date;
          body: string;
          creatorHandle: string;
          creatorName: string;
        },
      ];
    };
    const userLikes = await db.users.aggregate<UserLikes>(pipeline).toArray();
    if (userLikes.length === 0) return res.send({ likes: userLikes });

    const { tweets } = userLikes[0];
    const likes = tweets.map((like) => ({ ...like, isFavorite: true }));
    return res.send({ likes });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }
};
