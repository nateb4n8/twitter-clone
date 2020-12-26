import winston from 'winston';
import expressWinston from 'express-winston';
import { config } from './config';

const { env } = config;
const { format, transports } = winston;

const myFormat = format.printf(({ level, message, timestamp, meta }) => {
  let code = '';
  if (meta && meta.res && meta.res.statusCode) {
    code = `(${meta.res.statusCode}) `;
  }
  return `${timestamp} [${level}]: ${code}${message}`;
});

const { combine, timestamp, colorize } = format;

const consoleTransport = new transports.Console({
  silent: ['test'].includes(env),
});

winston.configure({
  format: combine(timestamp(), colorize(), myFormat),
  transports: [consoleTransport],
});

export const middlewareLogger = expressWinston.logger({
  transports: [consoleTransport],
  format: combine(timestamp(), colorize(), myFormat),
});

export const customWinston = winston;
