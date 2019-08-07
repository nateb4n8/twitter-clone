const winston = require('winston');
const { MongoClient } = require('mongodb');

const { mongo: { user, password } } = require('./config');

const url = 'mongodb://localhost:27017';
const opts = {
  useNewUrlParser: true,
  auth: { user, password }
};


function decorate(app) {
  MongoClient.connect(url, opts, (err, newClient) => {
    if (err) return winston.error('Unable to connect to DB');

    winston.info('Connected to DB');
    app.locals.db = newClient;
  });
}

module.exports = decorate;