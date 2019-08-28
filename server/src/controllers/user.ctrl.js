const winston = require('winston');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const { ObjectId } = require('mongodb');
const merge = require('lodash/merge');

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
  
  const { error } = validateProfile(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const updates = merge(user, req.body);
  const { insertedId } = await db.collection('users').replaceOne(filter, updates);
  
  res.status(200).send('ok');
}

const signin = async (req, res) => {
  const { error } = validateCreds(req.body);
  if (error) {
    winston.error(error);
    return res.status(400).send('Invalid email or password');
  }

  const { email, password } = req.body;
  const { db } = req.app.locals;
  
  let user = await db.collection('users').findOne({ email });
  if (!user) {
    winston.error('signin failed: email not found')
    return res.status(400).send('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
      winston.error('signing failed: invalid password')
    return res.status(400).send('Invalid email or password');
  }

  user = new User(user);
  const token = user.generateAuthToken();
  res.cookie('sid', token, { maxAge: 3*60*1000, httpOnly: true });
  res.send('ok');
};

function validateCreds(user) {
  const schema = {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required(),
  };

  return Joi.validate(user, schema);
}

module.exports = {
  getUser,
  updateProfile,
};