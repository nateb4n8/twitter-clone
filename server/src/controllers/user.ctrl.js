const winston = require('winston');
const { ObjectId } = require('mongodb');
const { pick, merge } = require('lodash');
const Jimp = require('jimp');
const { validateProfile } = require('../models/profile.model');
const { User } = require('../models/user.model');

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

async function updateProfile(req, res) {
  const { id } = req.token;
  const { db } = req.app.locals;

  const { error } = validateProfile(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const filter = { _id: ObjectId(id) };
  let user = await db.collection('users').findOne(filter);
  if (!user) return res.status(400).send('User not found');

  const userUpdates = merge(new Object(), user, req.body);
  
  if (req.files && req.files.profileImage) {
    try {
      const img = await Jimp.read(req.files.profileImage.data);
      const buffer = await img.resize(256,256).getBufferAsync(Jimp.MIME_JPEG);
      merge(userUpdates, {
        profileImage: {
          mimetype: Jimp.MIME_JPEG,
          data: buffer,
        }
      });
    } catch (error) {
      winston.error(error);
    }
  }
  const doc = await db.collection('users').findOneAndReplace(
    filter, 
    userUpdates,
    { returnOriginal: false },
  );

  if (doc.value === null) {
    return res.status(500).send('An issue occurred during update.');
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