const winston = require('winston');
const fs = require('fs');
const { ObjectId } = require('mongodb');
const { pick, merge } = require('lodash');
const Jimp = require('jimp');
const { profileSchema } = require('../models/profile.model');
const { User } = require('../models/user.model');
const { imageAssetsPath } = require('../../startup/config');


function getUserResponse(userDoc) {
  const result = pick(userDoc, [
    'name',
    'handle',
    'location',
    'website',
    'followingCount',
    'followerCount',
  ]);
  result.joinDate = ObjectId(userDoc._id).getTimestamp();

  if (userDoc.profileImage) {
    const { mimetype, data } = userDoc.profileImage;
    result.profileImageSrc = `data:${mimetype};base64,${data.toString('base64')}`;
  }

  return result;
}

async function getUser(req, res) {
  const { id } = req.token;
  const { db } = req.app.locals;
  let user;
  try {
    user = await db.collection('users').findOne({ _id: ObjectId(id) });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }
  
  if (user) {
    res.send(getUserResponse(user));
  } else {
    res.status(404).send('user not found');
  }
}

async function getUserByHandle(req, res) {
  const { handle } = req.params;
  const { db } = req.app.locals;
  let user;
  try {
    user = await db.collection('users').findOne({ handle });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }
  
  if (user) {
    res.send(getUserResponse(user));
  } else {
    res.status(404).send('user not found');
  }
}

// TODO make this a transaction somehow to ensure images and profile data stay
// synched
async function updateProfile(req, res) {
  const { id } = req.token;
  const { db } = req.app.locals;

  const { error } = profileSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const filter = { _id: ObjectId(id) };
  let user = await db.collection('users')
    .findOne(filter)
    .catch(error => winston.error(error) || null);
  if (!user) return res.status(400).send('User not found');

  const userUpdates = merge(new Object(), user, req.body);

  const doc = await db.collection('users').findOneAndReplace(
    filter, 
    userUpdates,
    { returnOriginal: false },
  );
  if (doc.value === null) {
    return res.status(500).send('An issue occurred during update.');
  }

  // rename profile images if handle has changed
  if (user.handle !== userUpdates.handle) {
    try {
      fs.renameSync(
        `${imageAssetsPath}${user.handle}.jpg`,
        `${imageAssetsPath}${userUpdates.handle}.jpg`
      );
      fs.renameSync(
        `${imageAssetsPath}${user.handle}-banner.jpg`,
        `${imageAssetsPath}${userUpdates.handle}-banner.jpg`
      );
    } catch (error) {
      winston.error(error);
    }
  }

  if (req.files) {
    const { profileImage, bannerImage } = req.files;
    
    if (profileImage) {
      try {
        const img = await Jimp.read(profileImage.data);
        await img
          .scaleToFit(256,256)
          .write(`${imageAssetsPath}${userUpdates.handle}.jpg`);
      } catch (error) {
        winston.error(error);
      }
    }

    if (bannerImage) {
      try {
        const bannerImg = await Jimp.read(req.files.bannerImage.data);
        await bannerImg
          .scaleToFit(1920,1080)
          .write(`${imageAssetsPath}${userUpdates.handle}-banner.jpg`);
      } catch (error) {
        winston.error(error);
      }  
    }
  }

  return res.send(getUserResponse(doc.value));
}

// need to make this function a transaction
async function follow(req, res) {
  const { handle } = req.token;
  const { handle: toFollow } = req.query;
  const { db } = req.app.locals;

  let currUser;
  let followee;
  try {
    currUser = await db.collection('users').findOne({ handle });
    followee = await db.collection('users').findOne({ handle: toFollow });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }
  
  if (!currUser) return res.status(400).send('handle not found');
  if (!followee) return res.status(400).send('handle to follow not found');

  currUser = new User(currUser);
  followee = new User(followee);

  let following = new Set(currUser.following);
  let followers = new Set(followee.followers);
  if (currUser.following.includes(toFollow)) {
    // need to unfollow
    following.delete(toFollow);
    followers.delete(handle);
  } else {
    // need to follow
    following.add(toFollow);
    followers.add(handle);
  }
  following = [...following];
  followers = [...followers];
  
  try {
    await db.collection('users').findOneAndUpdate(
      { handle },
      { $set: { following } },
    );
    await db.collection('users').findOneAndUpdate(
      { handle: toFollow },
      { $set: { followers } },
    );
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }

  res.send({ following });
}

module.exports = {
  getUser,
  getUserByHandle,
  updateProfile,
  follow,
};