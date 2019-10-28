const chai = require('chai');
const chaiHttp = require('chai-http');
const getDbClient = require('../../startup/db');
const serverPromise = require('../../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('/', () => {
  let agent;
  let client;
  let db;

  beforeAll(async () => {
    const server = await serverPromise();

    client = await getDbClient();
    db = await client.db('test');

    agent = chai.request.agent(server)
    await agent
      .post('/auth/signup')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'aaaaa'
      });
  });

  afterAll(async () => {
    await db.collection('users').deleteMany({});
    await client.close();
  });

  describe('GET', () => {
    describe('/favorite', () => {
      let query;
      beforeEach(() => {
        query = '?handle=test';
      });
      
      const exec = () => {
        return agent.get(`/favorite${query}`);
      }
  
      it('returns 400 if handle is not provided', async () => {
        query = '';
        const res = await exec();
        expect(res).to.have.status(400);
      });
    });

    describe('/:handle', () => {
      let handle;
      beforeEach(() => {
        handle = 'test';
      });
      
      const exec = () => {
        return agent.get(`/${handle}`);
      }
  
      it('returns 404 if handle is not provided', async () => {
        handle = '';
        const res = await exec();
        expect(res).to.have.status(404);
      });
    });
  });
});