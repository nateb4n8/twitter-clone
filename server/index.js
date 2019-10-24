const express = require('express');
const { port, env } = require('./startup/config');
const { winston } = require('./startup/logger');
const getDbClient = require('./startup/db');
const routes = require('./src/routers/index.router');
const middleware = require('./startup/middleware');

async function main() {
  const app = express();
  
  middleware(app);

  const client = await getDbClient();
  const dbName = env !== 'test' ? 'twitter' : 'test';
  const db = await client.db(dbName);
  app.locals.db = {
    users: db.collection('users'),
    tweets: db.collection('tweets'),
    collection: col => db.collection(col),
  }

  app.use(routes);

  if (env !== 'test') {
    const server = app.listen(
      port, 
      () => winston.info(`Listening on port: ${port}`)
    );
    server.on('close', async () => {
      winston.info('Server is closing');
      await client.close();
    });
  }

  return app;
}

if (env !== 'test') {
  main();
}

module.exports = main;
