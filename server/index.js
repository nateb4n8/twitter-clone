const express = require('express');

const { port } = require('./startup/config');
const winston = require('./startup/logger');

const app = express();

const server = app.listen(
  port, 
  () => winston.info(`Listening on port: ${port}`)
);

module.exports = server;
