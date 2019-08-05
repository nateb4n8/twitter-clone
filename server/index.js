const express = require('express');

const { port } = require('./startup/config');
const winston = require('./startup/logger');
const db = require('./startup/db');
const routes = require('./src/controllers/index.router');

const app = express();

app.use(routes);

const server = app.listen(
  port, 
  () => winston.info(`Listening on port: ${port}`)
);

module.exports = server;
