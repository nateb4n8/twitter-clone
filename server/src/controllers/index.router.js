const express = require('express');

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.send('ok');
});

module.exports = router;