const winston = require('winston');
const expressWinston = require('express-winston');

const { format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp, meta }) => {
  let code = '';
  if (meta && meta.res && meta.res.statusCode) {
    code = `(${meta.res.statusCode}) `;
  }
  return `${timestamp} [${level}]: ${code}${message}`;
});

winston.configure({
  format: combine(
    timestamp(),
    colorize(),
    myFormat,
  ),
  transports: [ new transports.Console() ]
})

const middlewareLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
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