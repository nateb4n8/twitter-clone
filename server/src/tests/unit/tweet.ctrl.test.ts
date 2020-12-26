import { ObjectId } from 'mongodb';
import request, { SuperAgentTest } from 'supertest';
import { FixMeLater } from '../../index';
import { Server } from '../../server';
import { getTestConfig } from '../test.utils';

describe('tweet.ctrl', () => {
  let server: Server;
  let agent: SuperAgentTest;

  beforeEach(async () => {
    server = new Server(getTestConfig(__filename));
    await server.setup();
    agent = request.agent(server.app);
    await agent.post('/auth/signup').send({
      name: 'test',
      email: 'test@test.com',
      password: 'aaaaa',
    });
  });

  afterEach(async () => {
    await server.db.dropDatabase();
    await server.shutdown();
  });

  describe('GET', () => {
    let query: FixMeLater;
    beforeEach(() => {
      query = '?handle=test';
    });

    const exec = () => {
      return agent.get(`/tweet${query}`);
    };

    it('returns 400 if handle is not provided', async () => {
      query = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });

  describe('POST', () => {
    let payload: FixMeLater;
    beforeEach(() => {
      payload = {
        body: 'a',
      };
    });

    const exec = () => {
      return agent.post('/tweet').send(payload);
    };

    it('returns 400 if tweet body is empty', async () => {
      payload.body = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('returns 400 if tweet body is longer than 256 characters', async () => {
      payload.body = 'a'.repeat(257);
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });

  describe('DELETE', () => {
    let tweetId: FixMeLater;
    beforeEach(() => {
      tweetId = new ObjectId();
    });

    const exec = () => {
      return agent.delete(`/tweet?id=${tweetId}`);
    };

    it('returns 400 if tweet id is not an ObjectId', async () => {
      let res;

      tweetId = '';
      res = await exec();
      expect(res.status).toBe(400);

      tweetId = 'a';
      res = await exec();
      expect(res.status).toBe(400);

      tweetId = '9';
      res = await exec();
      expect(res.status).toBe(400);
    });
  });
});
