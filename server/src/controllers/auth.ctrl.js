const winston = require('winston');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const { User, validate } = require('../models/user.model');

const signup = async (req, res) => {
  const { error } = validate(req.body);
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

  res.send(token);
};

const signin = async (req, res) => {
  const { error } = validateCreds(req.body);
  if (error) return res.status(400).send('Invalid email or password');

  const { email, password } = req.body;
  const { db } = req.app.locals;
  
  let user = await db.collection('users').findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  user = new User(user);
  const token = user.generateAuthToken();

  res.send(token);
};

function validateCreds(user) {
  const schema = {
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  signin,
  signup,
};