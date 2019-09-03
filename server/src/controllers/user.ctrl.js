const winston = require('winston');
const { ObjectId } = require('mongodb');
const { pick, merge } = require('lodash');
const Jimp = require('jimp');
const { validateProfile } = require('../models/profile.model');

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
  const { mimetype, data } = userDoc.profileImage;
  result.profileImageSrc = `data:${mimetype};base64,${data.toString('base64')}`;

  return result;
}

async function getUser(req, res) {
  const { id } = req.token;
  const { db } = req.app.locals;
  let user = await db.collection('users').findOne({ _id: ObjectId(id) });
  
  if (user) {
    res.send(getUserResponse(user));
  } else {
    res.status(500).send('');
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


module.exports = {
  getUser,
  updateProfile,
};