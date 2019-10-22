const serverPromise = require('../../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('server health check', () => {
  let server;
  beforeAll(async () => {
    server = await serverPromise();
  });

  it('should return 200', async () => {
    const res = await chai.request(server).get('/health-check');
    expect(res).to.have.status(200);
  });  
});
