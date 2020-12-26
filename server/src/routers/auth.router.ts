import express from 'express';
import { verifyAuth } from '../middleware/verifyAuth';
import { signin, signup } from '../controllers/auth.ctrl';
import { getUser } from '../controllers/user.ctrl';

const router = express.Router();
router.post('/signup', verifyAuth({ blockOnAuth: true }), signup);
router.post('/signin', verifyAuth({ blockOnAuth: true }), signin);
router.get('/signin', verifyAuth({ requireToken: true }), getUser);

export const authRouter = router;
