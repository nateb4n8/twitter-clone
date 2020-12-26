import express from 'express';
import { getProfileImage, getBannerImage } from '../controllers/assets.ctrl';

const router = express.Router();
router.get('/profileImage/:handle', getProfileImage);
router.get('/bannerImage/:handle', getBannerImage);

export const assetsRouter = router;
