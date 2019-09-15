const express = require('express');
const verifyAuth = require('../middleware/verifyAuth');
const { signin, signup } = require('../controllers/auth.ctrl');
const { getUser } = require('../controllers/user.ctrl');

const router = express.Router();

router.post('/signup', verifyAuth({ blockOnAuth: true }),  signup);
router.post('/signin', verifyAuth({ blockOnAuth: true }), signin);
router.get('/signin', verifyAuth({ requireToken: true }), getUser);

module.exports = router;