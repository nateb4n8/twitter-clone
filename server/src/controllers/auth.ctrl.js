const winston = require('winston');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const { ObjectId } = require('mongodb');
const { User, userSchema } = require('../models/user.model');
const { cookieOptions } = require('../../startup/config');
const { pick } = require('lodash');



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

const signup = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: error.details[0].message,
    });
  }

  const { email, name, password } = req.body;
  const { db } = req.app.locals;
  
  let user = await db.collection('users').findOne({ email });
  if (user) {
    return res.status(400).send({
      error: 'Account with email already exist',
    });
  }

  user = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const { insertedId: id } = await db.collection('users').insertOne(user);
  
  user._id = id;
  const token = user.generateAuthToken();
  res.cookie('sid', token, cookieOptions);
  
  res.status(201).send(getUserResponse(user));
};

const signin = async (req, res) => {
  const { error } = validateCreds(req.body);
  if (error) {
    winston.error(error);
    return res.status(400).send({ error: 'Invalid email or password' });
  }

  const { email, password } = req.body;
  const { db } = req.app.locals;
  
  let user = await db.collection('users').findOne({ email });
  if (!user) {
    winston.error('signin failed: email not found')
    return res.status(400).send({ error: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    winston.error('signing failed: invalid password')
    return res.status(400).send({ error: 'Invalid email or password' });
  }

  user = new User(user);
  const token = user.generateAuthToken();
  res.cookie('sid', token, cookieOptions);

  res.send(getUserResponse(user));
};

function validateCreds(user) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required(),
  });
  return schema.validate(user);
}

module.exports = {
  signin,
  signup,
};