const express = require('express');

const authRoutes = require('./auth.router');
const userRoutes = require('./user.router');
const searchRoutes = require('./search.router');
const assetsRoutes = require('./assets.router');

const router = express.Router();

router.use('/', userRoutes);
router.get('/health-check', (req, res) => res.send('ok'));
router.use('/auth', authRoutes);
router.use('/search', searchRoutes);

router.use('/assets', assetsRoutes);

module.exports = router;