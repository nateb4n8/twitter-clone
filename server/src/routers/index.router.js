const express = require('express');

const authRoutes = require('./auth.router');

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.send('ok');
});

router.use('/auth', authRoutes);

module.exports = router;