import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import 'dotenv';

export const mongooseConfig = registerAs(
  'mongoose',
  (): MongooseModuleOptions => {
    const {
      MONGO_HOST,
      MONGO_PORT,
      MONGO_USER,
      MONGO_PASS,
      MONGO_AUTH_DB,
      MONGO_DB,
    } = process.env;
    const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_AUTH_DB}`;

    return { uri };
  },
);
