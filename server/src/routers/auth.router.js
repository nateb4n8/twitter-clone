const express = require('express');
const winston = require('winston');

const { signin, signup } = require('../controllers/auth.ctrl');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;