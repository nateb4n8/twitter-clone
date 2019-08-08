const express = require('express');
const winston = require('winston');
const bcrypt = require('bcrypt');

const { User, validate } = require('../models/user.model');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, name, password } = req.body;
  const { db } = req.app.locals;
  
  let user = await db.collection('users').findOne({ email });
  if (user) return res.status(400).send('Account with email already exist');

  user = new User(name, email, password);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const { insertedId: id } = await db.collection('users').insertOne(user);
  
  res.send({ email, name, id});
});

module.exports = router;