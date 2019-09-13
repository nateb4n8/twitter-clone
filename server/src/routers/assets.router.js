const express = require('express');
const { getProfileImage, getBannerImage } = require('../controllers/assets.ctrl');


const router = express.Router();

router.get('/profileImage/:handle', getProfileImage);
router.get('/bannerImage/:handle', getBannerImage);

module.exports = router;