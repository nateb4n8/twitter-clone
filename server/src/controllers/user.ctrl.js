const winston = require('winston');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const { ObjectId } = require('mongodb');
const merge = require('lodash/merge');
const Jimp = require('jimp');

const { User, validate } = require('../models/user.model');
const { validateProfile } = require('../models/profile.model');

async function getUser(req, res) {
  const { id } = req.token;
  const { db } = req.app.locals;
  let user = await db.collection('users').findOne({ _id: ObjectId(id) });
  
  if (user) {
    const {
      name,
      handle,
      location,
      followingCount,
      followerCount,
      profileImageSrc,
      _id,
    } = user;
    res.send({
      name,
      handle,
      location,
      followingCount,
      followerCount,
      profileImageSrc,
      joinDate: ObjectId(_id).getTimestamp(),
    });
  } else {
    res.status(500).send('');
  }
}

async function updateProfile(req, res) {
  const { id } = req.token;
  const { db } = req.app.locals;
  const filter = { _id: ObjectId(id) };
  let user = await db.collection('users').findOne(filter);
  if (!user) return res.status(400).send('User not found');
  
  if (req.headers['content-type'].match('multipart/form-data')) {
    winston.info('Image uploading...');

    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    let { image } = req.files;
    let imgPath = `${process.cwd()}/assets/profileImages/${user.handle}.jpg`;
    image.mv(imgPath, async (err) => {
      if (err) return res.status(500).send(err);
      
      const img = await Jimp.read(imgPath)
        .catch(e => {
          winston.error(e);
          res.status(400).send(e.message);
          return null;
        });
      
      if (img) {
        img.resize(64,64).write(imgPath);
        winston.info('Image uploaded successfuly');
        res.send('ok');
      }
    });
  
  } else if (req.headers['content-type'] === 'application/json') {
    const { error } = validateProfile(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const updates = merge(user, req.body);
    const { insertedId } = await db.collection('users').replaceOne(filter, updates);
    
    res.send('ok');
  }
}

module.exports = {
  getUser,
  updateProfile,
};