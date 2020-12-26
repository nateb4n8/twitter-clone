import express from 'express';
import { authRouter } from './auth.router';
import { userRouter } from './user.router';
import { searchRouter } from './search.router';
import { assetsRouter } from './assets.router';
import { tweetRouter } from './tweet.router';

const expressRouter = express.Router();
expressRouter.get('/health-check', (_req, res) => res.send('ok'));
expressRouter.use('/auth', authRouter);
expressRouter.use('/search', searchRouter);
expressRouter.use('/assets', assetsRouter);
expressRouter.use('/tweet', tweetRouter);
expressRouter.use('/', userRouter);

export const router = expressRouter;
