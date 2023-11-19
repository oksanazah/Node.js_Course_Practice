import request from 'supertest';
import app from '../src/index';
import { MovieModel } from '../src/models/movies.schemas';

describe('/movies', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET', () => {
    it('should return 200 OK', async () => {
      jest.spyOn(MovieModel, 'find').mockResolvedValue([]);

      const response = await request(app).get('/movies');

      expect(response.status).toBe(200);
    });
  });
});
