import { Application, json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { middlewareLogger } from './logger';

export function middleware(expressApp: Application) {
  expressApp.use(fileUpload());
  expressApp.use(json());
  expressApp.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000', 'http://localhost:3001'],
    }),
  );
  expressApp.use(cookieParser());
  expressApp.use(middlewareLogger);
}
