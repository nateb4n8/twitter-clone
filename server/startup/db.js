const winston = require('winston');
const { MongoClient } = require('mongodb');

const { mongo: { user, password } } = require('./config');

const onConnect = (err, client) => {
  if (err) return winston.error('Unable to connect to DB', err);

  winston.info('Connected to DB');

  client.close();
};

const url = 'mongodb://localhost:27017';
const opts = {
  useNewUrlParser: true,
  auth: { user, password }
};
MongoClient.connect(url, opts, onConnect);
