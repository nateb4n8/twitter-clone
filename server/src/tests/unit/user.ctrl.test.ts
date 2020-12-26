import request from 'supertest';
import { FixMeLater } from '../../index';
import { Server } from '../../server';
import { getTestConfig } from '../test.utils';

describe('user.ctrl', () => {
  let server: Server;
  let agent: FixMeLater;

  beforeAll(async () => {
    server = new Server(getTestConfig(__filename));
    await server.setup();
    agent = request.agent(server.app);
    await agent.post('/auth/signup').send({
      name: 'test',
      email: 'test@test.com',
      password: 'aaaaa',
    });
  });

  afterAll(async () => {
    await server.db.dropDatabase();
    await server.shutdown();
  });

  describe('GET', () => {
    describe('/favorite', () => {
      let query: FixMeLater;
      beforeEach(() => {
        query = '?handle=test';
      });

      const exec = () => {
        return agent.get(`/favorite${query}`);
      };

      it('returns 400 if handle is not provided', async () => {
        query = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });

    describe('/:handle', () => {
      let handle: FixMeLater;
      beforeEach(() => {
        handle = 'test';
      });

      const exec = () => {
        return agent.get(`/${handle}`);
      };

      it('returns 404 if handle is not provided', async () => {
        handle = '';
        const res = await exec();
        expect(res.status).toBe(404);
      });
    });
  });
});
