const express = require('express');

const { getUser, updateProfile } = require('../controllers/user.ctrl');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.get('/', verifyAuth({ requireToken: true }),  getUser);
router.put('/', verifyAuth({ requireToken: true }),  updateProfile);

module.exports = router;