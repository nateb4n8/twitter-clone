const express = require('express');
const { signin, signup } = require('../controllers/auth.ctrl');
const verifyAuth = require('../middleware/verifyAuth');

const router = express.Router();

router.post('/signup', verifyAuth({ blockOnAuth: true }),  signup);
router.post('/signin', verifyAuth({ blockOnAuth: true }), signin);
router.get('/signin', verifyAuth({ blockOnAuth: true, requireToken: true }));

module.exports = router;