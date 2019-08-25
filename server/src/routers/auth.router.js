const express = require('express');
const winston = require('winston');
const jwt = require('jsonwebtoken');

const { signin, signup } = require('../controllers/auth.ctrl');
const { jwtSecret } = require('../../startup/config');

const router = express.Router();

function verifyAuth({ blockOnAuth }) {
  return (req, res, next) => {
    try {
      req.token = jwt.verify(req.cookies.sid, jwtSecret);
      req.isAuthenticated = true;
      winston.info('Good cookie');
      
      if (blockOnAuth) return res.send('Already signed in');
    } catch (error) {
      req.isAuthenticated = false;
      winston.info('Bad cookie');
    }

    next();
  }
}

router.post('/signup', verifyAuth({ blockOnAuth: true }),  signup);
router.post('/signin', verifyAuth({ blockOnAuth: true }), signin);

module.exports = router;