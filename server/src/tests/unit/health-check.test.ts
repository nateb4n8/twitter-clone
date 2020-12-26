import request from 'supertest';
import { Server } from '../../server';
import { getTestConfig } from '../test.utils';

describe('health-check', () => {
  let server: Server;

  beforeEach(async () => {
    server = new Server(getTestConfig(__filename));
    await server.setup();
  });

  afterEach(async () => {
    await server.db.dropDatabase();
    await server.shutdown();
  });

  it('should return 200', async () => {
    const response = await request(server.app).get('/health-check');
    expect(response.status).toBe(200);
  });
});
