import express from 'express';
import { createTweet, getTweetsByUser, deleteTweet } from '../controllers/tweet.ctrl';
import { verifyAuth } from '../middleware/verifyAuth';

const router = express.Router();
router.get('', verifyAuth({ requireToken: true }), getTweetsByUser);
router.post('', verifyAuth({ requireToken: true }), createTweet);
router.delete('', verifyAuth({ requireToken: true }), deleteTweet);

export const tweetRouter = router;
