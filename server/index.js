const express = require('express');
const cors = require('cors');

const { port } = require('./startup/config');
const winston = require('./startup/logger');
const attachDB = require('./startup/db');
const routes = require('./src/routers/index.router');

const app = express();

attachDB(app);

app.use(express.json());

app.use(cors());
app.use(routes);

const server = app.listen(
  port, 
  () => winston.info(`Listening on port: ${port}`)
);

module.exports = server;
