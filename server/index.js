const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { port } = require('./startup/config');
const winston = require('./startup/logger');
const getDbClient = require('./startup/db');
const routes = require('./src/routers/index.router');

async function main() {
  const app = express();
  
  app.use(express.json());
  app.use(cors({ 
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001']
  }));
  
  app.use(cookieParser());

  const client = await getDbClient();

  app.locals.db = client.db('twitter');
  app.use(routes);

  return app.listen(
    port, 
    () => winston.info(`Listening on port: ${port}`)
  );
}

main();

module.exports = main;
