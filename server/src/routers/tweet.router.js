const express = require('express');
const { createTweet, getTweetsByUser, deleteTweet } = require('../controllers/tweet.ctrl');
const verifyAuth = require('../middleware/verifyAuth');


const router = express.Router();
router.get('', verifyAuth({ requireToken: true }),  getTweetsByUser);
router.post('', verifyAuth({ requireToken: true }),  createTweet);
router.delete('', verifyAuth({ requireToken: true }),  deleteTweet);


module.exports = router;