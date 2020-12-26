import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { config } from '../startup/config';

type AuthToken = {
  id: ObjectId;
  handle: string;
};

type VerifyAuthOpts = {
  blockOnAuth?: boolean;
  requireToken?: boolean;
};

export function verifyAuth({ blockOnAuth, requireToken }: VerifyAuthOpts): RequestHandler {
  const handler: RequestHandler = (req, res, next) => {
    try {
      const decodedToken = jwt.verify(req.cookies.sid, config.jwtSecret) as AuthToken;
      if (typeof decodedToken === 'string') throw new Error('Invalid token');
      if (res.locals) {
        res.locals.auth = {
          token: decodedToken,
          id: new ObjectId(decodedToken.id),
          isAuthenticated: true,
        };
      } else {
        res.locals = {
          auth: {
            token: decodedToken,
            id: new ObjectId(decodedToken.id),
            isAuthenticated: true,
          },
        };
      }
      if (blockOnAuth) return res.send('Already signed in');
    } catch (error) {
      res.locals = {
        auth: {
          isAuthenticated: false,
        },
      };
      if (requireToken) return res.status(401).send('Please sign in first');
    }
    return next();
  };
  return handler;
}
