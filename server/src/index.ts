// import { Application, Response } from 'express';
// import { Collection, ObjectId } from 'mongodb';
// import { Tweet } from './models/tweet.model';
// import { User } from './models/user.model';

import { Server } from './server';
import { config } from './startup/config';

export type FixMeLater = any;

// export interface CustomResponse extends Response {
//   isAuthenticated: boolean;
//   token: {
//     id: ObjectId;
//     handle: string;
//   };
//   app: Application & {
//     locals: {
//       db: {
//         users: Collection<User>;
//         tweets: Collection<Tweet>;
//       };
//     };
//   };
// }

export default async function main() {
  new Server(config).start();
}

main();
