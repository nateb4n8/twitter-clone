import { Collection, ObjectId } from 'mongodb';
import { Application } from 'express';
import { User } from '../../models/user.model';
import { Tweet } from '../../models/tweet.model';

declare module 'Express' {
  export interface Response {
    app: Application & {
      locals: {
        db: {
          users: Collection<User>;
          tweets: Collection<Tweet>;
        };
      };
    };
    locals: {
      auth: {
        isAuthenticated: boolean;
        token: {
          id: ObjectId;
          handle: string;
        };
      };
    };
  }
}
