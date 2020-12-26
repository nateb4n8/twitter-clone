import express from 'express';
import {
  follow,
  getUser,
  getUserByHandle,
  getUserLikes,
  toggleFavoriteTweet,
  updateProfile,
} from '../controllers/user.ctrl';
import { verifyAuth } from '../middleware/verifyAuth';

const router = express.Router();

router.get('/profile/', verifyAuth({ requireToken: true }), getUser);
router.get('/favorite', getUserLikes);
router.get('/:handle', verifyAuth({ requireToken: true }), getUserByHandle);
router.put('/', verifyAuth({ requireToken: true }), updateProfile);
router.put('/follow', verifyAuth({ requireToken: true }), follow);
router.put('/favorite', verifyAuth({ requireToken: true }), toggleFavoriteTweet);

export const userRouter = router;
