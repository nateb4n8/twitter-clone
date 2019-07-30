const winston = require('winston');

const { format, transports } = winston;
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`
});

winston.configure({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [ new transports.Console() ]
})

module.exports = winston;