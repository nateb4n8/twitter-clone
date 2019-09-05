const { json } = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { middlewareLogger } = require('../startup/logger');

function main(expressApp) {
  expressApp.use(fileUpload());
  expressApp.use(json());
  expressApp.use(cors({ 
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001']
  }));
  expressApp.use(cookieParser());
  expressApp.use(middlewareLogger);
}

module.exports = main;