const express = require('express');

const app = express();

// TODO: setup config
// TODO: setup logging

const server = app.listen(3000, () => console.log('Server started'));
