import express from 'express';
import { verifyAuth } from '../middleware/verifyAuth';
import { search } from '../controllers/search.ctrl';

const router = express.Router();
router.get('/', verifyAuth({ requireToken: true }), search);

export const searchRouter = router;
