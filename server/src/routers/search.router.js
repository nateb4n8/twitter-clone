const express = require('express');
const verifyAuth = require('../middleware/verifyAuth');
const { search } = require('../controllers/search.ctrl');

const router = express.Router();

router.get('/', verifyAuth({ requireToken: true }),  search);

module.exports = router;