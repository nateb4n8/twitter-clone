import winston from 'winston';
import { MongoClient } from 'mongodb';
import { config } from './config';

const {
  mongo: { user, password },
} = config;

export async function getMongoClient(): Promise<MongoClient> {
  const url = 'mongodb://localhost:27017/admin';
  const opts = {
    auth: { user, password },
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
