const chai = require('chai');
const chaiHttp = require('chai-http');
const getDbClient = require('../../startup/db');
const serverPromise = require('../../index');

chai.use(chaiHttp);
const expect = chai.expect;


async function invalidEmailTest(body, exec) {
  let res;
  
  body.email = 'a@a';
  res = await exec();
  expect(res).to.have.status(400);

  body.email = '@a.co';
  res = await exec();
  expect(res).to.have.status(400);

  body.email = 'a.co';
  res = await exec();
  expect(res).to.have.status(400);
}

async function undefinedEmailTest(body, exec) {
  body.email = undefined;
  const res = await exec();
  expect(res).to.have.status(400);
}

async function undefinedPasswordTest(body, exec) {
  body.password = undefined;
  const res = await exec();
  expect(res).to.have.status(400);
}

async function minPasswordTest(body, exec) {
  body.password = 'aaaa';
  const res = await exec();
  expect(res).to.have.status(400);
}

async function maxPasswordTest(body, exec) {
  body.name = 'a'.repeat(31);
  const res = await exec();
  expect(res).to.have.status(400);
}

describe('auth', () => {
  let server;
  let client;
  let db;
  beforeAll(async () => {
    server = await serverPromise();

    client = await getDbClient();
    db = await client.db('test');
  });

  afterAll(async () => {
    await db.collection('users').deleteMany({});
    await client.close();
  });

  describe('/signup', () => {
    describe('POST', () => {
      let body;
      beforeEach(() => {
        body = {
          name: 'a',
          email: 'a@a.co',
          password: 'aaaaa'
        };
      });
      
      const exec = () => {
        return chai.request(server)
          .post('/auth/signup')
          .send(body);
      }

      it('returns 400 if name is not provided', async () => {
        body.name = undefined;
        const res = await exec();
        expect(res).to.have.status(400);
      });

      it('returns 400 if name is less than 1 character', async () => {
        body.name = '';
        const res = await exec();
        expect(res).to.have.status(400);
      });

      it('returns 400 if name is more than 30 characters', async () => {
        body.name = 'a'.repeat(31);
        const res = await exec();
        expect(res).to.have.status(400);
      });
      
      it('returns 400 if email is not provided', () => undefinedEmailTest(body, exec));

      it('returns 400 if email is invalid', () => invalidEmailTest(body, exec));
      
      it('returns 400 if password is not provided', () => undefinedPasswordTest(body, exec));

      it('returns 400 if password is less than 5 characters', () => minPasswordTest(body, exec));

      it('returns 400 if password is more than 30 characters', () => maxPasswordTest(body, exec));

      it('returns 200 for valid request', async () => {
        const res = await exec();
        expect(res).to.have.status(201);
      });
    });
  });

  describe('/signin', () => {
    describe('/POST', () => {
      let body;
      beforeEach(() => {
        body = {
          name: 'a',
          email: 'a@a.co',
          password: 'aaaaa'
        };
      });
      
      const exec = () => {
        return chai.request(server)
          .post('/auth/signin')
          .send(body);
      }

      it('returns 400 if email is not provided', () => undefinedEmailTest(body, exec));
      
      it('returns 400 if email is invalid', () => invalidEmailTest(body, exec));

      it('returns 400 if password is not provided', () => undefinedPasswordTest(body, exec));

      it('returns 400 if password is less than 5 characters', () => minPasswordTest(body, exec));

      it('returns 400 if password is more than 30 characters', () => maxPasswordTest(body, exec));
    });

    describe('/GET', () => {
      it('returns 401 if token not provided', async () => {
        const res = await chai.request(server).get('/auth/signin');
        expect(res).to.have.status(401);
      });
    });
  });
});
