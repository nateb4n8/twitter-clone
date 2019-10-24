const chai = require('chai');
const chaiHttp = require('chai-http');
const { ObjectId } = require('mongodb');
const getDbClient = require('../../startup/db');
const serverPromise = require('../../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('/tweet', () => {
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
    let query;
    beforeEach(() => {
      query = '?handle=test';
    });
    
    const exec = () => {
      return agent.get(`/tweet${query}`);
    }

    it('returns 400 if handle is not provided', async () => {
      query = '';
      const res = await exec();
      expect(res).to.have.status(400);
    });
  });

  describe('POST', () => {
    let payload;
    beforeEach(() => {
      payload = {
        body: 'a',
      };
    });
    
    const exec = () => {
      return agent.post('/tweet').send(payload);
    }

    it('returns 400 if tweet body is empty', async () => {
      payload.body = '';
      const res = await exec();
      expect(res).to.have.status(400);
    });

    it('returns 400 if tweet body is longer than 256 characters', async () => {
      payload.body = 'a'.repeat(257);
      const res = await exec();
      expect(res).to.have.status(400);
    });
  });

  describe('DELETE', () => {
    let tweetId;
    beforeEach(() => {
      tweetId = new ObjectId();
    });
    
    const exec = () => {
      return agent.delete(`/tweet?id=${tweetId}`);
    }

    it('returns 400 if tweet id is not an ObjectId', async () => {
      let res;

      tweetId = '';
      res = await exec();
      expect(res).to.have.status(400);
      
      tweetId = 'a';
      res = await exec();
      expect(res).to.have.status(400);
      
      tweetId = '9';
      res = await exec();
      expect(res).to.have.status(400);
    });
  });
});