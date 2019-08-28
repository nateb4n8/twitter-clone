const express = require('express');
const fs = require('fs');
const winston = require('winston');
const authRoutes = require('./auth.router');
const userRoutes = require('./user.router');

const router = express.Router();

router.get('/health-check', (req, res) => res.send('ok'));

router.use('/auth', authRoutes);
router.use('/profile', userRoutes);

router.get('/assets/profileImages/:handle', (req, res) => {
  const { handle } = req.params;

  fs.readdir(`${process.cwd()}/assets/profileImages/`, (err, files) => {
    if (err) {
      winston.error(err);
      res.status(500).send('');
    } else {
      let fileName = files.find(file => file.split('.')[0] === handle);
      fileName = fileName ? fileName : 'default.svg'
      res.sendFile(`${process.cwd()}/assets/profileImages/${fileName}`)
    }
  });
}); 

module.exports = router;