const express = require('express');

const { getUser, getUserByHandle, updateProfile } = require('../controllers/user.ctrl');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.get('/profile/', verifyAuth({ requireToken: true }),  getUser);
router.get('/:handle', verifyAuth({ requireToken: true }),  getUserByHandle);
router.put('/', verifyAuth({ requireToken: true }),  updateProfile);

module.exports = router;