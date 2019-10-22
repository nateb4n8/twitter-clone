const winston = require('winston');
const expressWinston = require('express-winston');
const { env } = require('./config');

const { format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp, meta }) => {
  let code = '';
  if (meta && meta.res && meta.res.statusCode) {
    code = `(${meta.res.statusCode}) `;
  }
  return `${timestamp} [${level}]: ${code}${message}`;
});

const consoleTransport = new transports.Console({
  silent: ['test'].includes(env),
})

winston.configure({
  format: combine(
    timestamp(),
    colorize(),
    myFormat,
  ),
  transports: [ consoleTransport ],
});

const middlewareLogger = expressWinston.logger({
  transports: [ consoleTransport ],
  format: combine(
    timestamp(),
    colorize(),
    myFormat,
  ),
});

module.exports = {
  winston,
  middlewareLogger,
};