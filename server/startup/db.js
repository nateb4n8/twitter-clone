const winston = require('winston');
const { MongoClient } = require('mongodb');

const { mongo: { user, password } } = require('./config');

async function main() {
  const url = 'mongodb://localhost:27017/admin';
  const opts = {
    useNewUrlParser: true,
    auth: { user, password }
  };
  const client = new MongoClient(url, opts);
  try {
    await client.connect();
  } catch (error) {
    winston.error('Unable to connect to DB: ', error);
  }
  
  if (client.isConnected()) {
    winston.info('Connected to DB');
  }
  
  return client;
}

module.exports = main;