const winston = require('winston');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const { User, userSchema } = require('../models/user.model');
const { cookieOptions } = require('../../startup/config');

const signup = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, name, password } = req.body;
  const { db } = req.app.locals;
  
  let user = await db.collection('users').findOne({ email });
  if (user) return res.status(400).send('Account with email already exist');

  user = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const { insertedId: id } = await db.collection('users').insertOne(user);
  
  user._id = id;
  const token = user.generateAuthToken();
  res.cookie('sid', token, cookieOptions);
  
  res.status(201).send('ok');
};

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
  res.cookie('sid', token, cookieOptions);

  res.send('ok');
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