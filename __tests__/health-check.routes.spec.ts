import request from 'supertest';
import app from '../src/index';

describe('/health-check', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/health-check');

      expect(response.status).toBe(200);
    });
  });
});
