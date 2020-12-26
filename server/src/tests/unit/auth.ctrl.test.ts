import request from 'supertest';
import { FixMeLater } from '../../index';
import { Server } from '../../server';
import { getTestConfig } from '../test.utils';

async function invalidEmailTest(body: FixMeLater, exec: FixMeLater) {
  let res;

  res = await exec({ ...body, email: 'a@a' });
  expect(res.status).toBe(400);

  res = await exec({ ...body, email: '@a.co' });
  expect(res.status).toBe(400);

  res = await exec({ ...body, email: 'a.co' });
  expect(res.status).toBe(400);
}

async function undefinedEmailTest(body: FixMeLater, exec: FixMeLater) {
  const res = await exec({ ...body, email: undefined });
  expect(res.status).toBe(400);
}

async function undefinedPasswordTest(body: FixMeLater, exec: FixMeLater) {
  const res = await exec({ ...body, password: undefined });
  expect(res.status).toBe(400);
}

async function minPasswordTest(body: FixMeLater, exec: FixMeLater) {
  const res = await exec({ ...body, password: 'aaaa' });
  expect(res.status).toBe(400);
}

async function maxPasswordTest(body: FixMeLater, exec: FixMeLater) {
  const res = await exec({ ...body, name: 'a'.repeat(31) });
  expect(res.status).toBe(400);
}

describe('auth', () => {
  let server: Server;

  beforeEach(async () => {
    server = new Server(getTestConfig(__filename));
    await server.setup();
  });

  afterEach(async () => {
    await server.db.dropDatabase();
    await server.shutdown();
  });

  describe('/signup', () => {
    describe('POST', () => {
      let body: FixMeLater;
      beforeEach(() => {
        body = {
          name: 'a',
          email: 'a@a.co',
          password: 'aaaaa',
        };
      });

      const exec = (payload: FixMeLater) => {
        return request(server.app).post('/auth/signup').send(payload);
      };

      it('returns 400 if name is not provided', async () => {
        body = { ...body, name: undefined };
        const res = await exec(body);
        expect(res.status).toBe(400);
      });

      it('returns 400 if name is less than 1 character', async () => {
        body = { ...body, name: '' };
        const res = await exec(body);
        expect(res.status).toBe(400);
      });

      it('returns 400 if name is more than 30 characters', async () => {
        body = { ...body, name: 'a'.repeat(31) };
        const res = await exec(body);
        expect(res.status).toBe(400);
      });

      it('returns 400 if email is not provided', () => undefinedEmailTest(body, exec));

      it('returns 400 if email is invalid', () => invalidEmailTest(body, exec));

      it('returns 400 if password is not provided', () => undefinedPasswordTest(body, exec));

      it('returns 400 if password is less than 5 characters', () => minPasswordTest(body, exec));

      it('returns 400 if password is more than 30 characters', () => maxPasswordTest(body, exec));

      it('returns 200 for valid request', async () => {
        const res = await exec(body);
        expect(res.status).toBe(201);
      });
    });
  });

  describe('/signin', () => {
    describe('/POST', () => {
      let body: FixMeLater;

      beforeEach(() => {
        body = {
          name: 'a',
          email: 'a@a.co',
          password: 'aaaaa',
        };
      });

      const exec = (payload: FixMeLater) => {
        return request(server.app).post('/auth/signin').send(payload);
      };

      it('returns 400 if email is not provided', () => undefinedEmailTest(body, exec));

      it('returns 400 if email is invalid', () => invalidEmailTest(body, exec));

      it('returns 400 if password is not provided', () => undefinedPasswordTest(body, exec));

      it('returns 400 if password is less than 5 characters', () => minPasswordTest(body, exec));

      it('returns 400 if password is more than 30 characters', () => maxPasswordTest(body, exec));
    });

    describe('/GET', () => {
      it('returns 401 if token not provided', async () => {
        const res = await request(server.app).get('/auth/signin');
        expect(res.status).toBe(401);
      });
    });
  });
});
