const express = require('express');
const { port } = require('./startup/config');
const { winston } = require('./startup/logger');
const getDbClient = require('./startup/db');
const routes = require('./src/routers/index.router');
const middleware = require('./startup/middleware');

async function main() {
  const app = express();
  
  middleware(app);

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
