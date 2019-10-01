const express = require('express');
const {
  getUser,
  getUserByHandle,
  updateProfile,
  follow,
  toggleFavoriteTweet,
} = require('../controllers/user.ctrl');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.get('/profile/', verifyAuth({ requireToken: true }),  getUser);
router.get('/:handle', verifyAuth({ requireToken: true }),  getUserByHandle);
router.put('/', verifyAuth({ requireToken: true }),  updateProfile);
router.put('/follow', verifyAuth({ requireToken: true }), follow);
router.put('/favorite', verifyAuth({ requireToken: true }), toggleFavoriteTweet);


module.exports = router;