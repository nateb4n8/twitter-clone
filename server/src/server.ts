import express, { Application } from 'express';
import { Db, MongoClient } from 'mongodb';
import { getMongoClient } from './startup/db';
import { middleware } from './startup/middleware';
import { FixMeLater } from '.';
import { router } from './routers/index.router';

export class Server {
  private _config: FixMeLater;

  private _app!: Application;

  private _mongoClient!: MongoClient;

  private _db!: Db;

  constructor(config: FixMeLater) {
    this._config = config;
  }

  async setup() {
    const { mongo } = this._config;
    this._mongoClient = await getMongoClient();
    this._db = await this._mongoClient.db(mongo.dbName);

    const app = express();
    app.locals.db = {
      users: this._db.collection('users'),
      tweets: this._db.collection('tweets'),
      collection: (col: FixMeLater) => this._db.collection(col),
    };

    middleware(app);

    app.use(router);

    this._app = app;
  }

  async start() {
    const { port } = this._config;
    if (!this._app) {
      await this.setup();
    }

    const server = this._app.listen(port, () => console.info(`Listening on port: ${port}`));
    server.on('close', async () => {
      console.info('Server is closing');
      await this._mongoClient.close(true);
    });
  }

  async shutdown() {
    this._mongoClient.close(true);
  }

  public get app(): Application {
    return this._app;
  }

  public get db(): Db {
    return this._db;
  }

  public get mongoClient(): MongoClient {
    return this._mongoClient;
  }
}
