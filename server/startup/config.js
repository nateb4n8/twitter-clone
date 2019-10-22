require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
  },
  jwtSecret: process.env.JWT_SECRET,
  cookieOptions: {
    maxAge: 24*60*60*1000,
    httpOnly: true
  },
  imageAssetsPath: `${process.cwd()}/assets/images/`,
}