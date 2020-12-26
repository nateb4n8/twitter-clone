import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || '',
  port: process.env.PORT,
  mongo: {
    dbName: process.env.MONGO_DBNAME || '',
    user: process.env.MONGO_USERNAME || '',
    password: process.env.MONGO_PASSWORD || '',
  },
  jwtSecret: process.env.JWT_SECRET || 'NotASecret',
  cookieOptions: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
  imageAssetsPath: `${process.cwd()}/assets/images/`,
};
