require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongo: {
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
  },
  jwtSecret: process.env.JWT_SECRET,
}