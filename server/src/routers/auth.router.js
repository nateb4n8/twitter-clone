const express = require('express');
const winston = require('winston');

const { User, validate } = require('../models/user.model');

const router = express.Router();

router.post('/signup', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.send('currently unavailable');
});

module.exports = router;