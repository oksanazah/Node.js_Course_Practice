import request from 'supertest';
import app from '../src/index';
import { GenreModel } from '../src/models/genres.schemas';
import { mockGenres } from './mock-data';

describe('/genres', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET', () => {
    it('should return 200 OK', async () => {
      jest.spyOn(GenreModel, 'find').mockResolvedValue(mockGenres);

      const response = await request(app).get('/genres');

      expect(response.status).toBe(200);
    });

    it('should return genres', async () => {
      jest.spyOn(GenreModel, 'find').mockResolvedValue(mockGenres);

      const response = await request(app).get('/genres');

      expect(response.body).toEqual({ data: mockGenres });
    });

    it('should return message "Genres not added yet"', async () => {
      jest.spyOn(GenreModel, 'find').mockResolvedValue([]);

      const response = await request(app).get('/genres');

      expect(response.body).toEqual({ data: 'Genres not added yet' });
    });

    it('should return 500 server error', async () => {
      jest.spyOn(GenreModel, 'find').mockRejectedValue(new Error('some error'));

      const response = await request(app).get('/genres');

      expect(response.status).toEqual(500);
    });
  });

  describe('POST', () => {
    it('should return 201 OK', async () => {
      const genre = { name: 'New genre' };
      GenreModel.prototype.save = jest.fn().mockResolvedValue(genre);

      const response = await request(app).post('/genres').send(genre);

      expect(response.status).toEqual(201);
    });

    it('should return created genre', async () => {
      const genre = { name: 'New genre' };
      GenreModel.prototype.save = jest.fn().mockResolvedValue(genre);

      const response = await request(app).post('/genres').send(genre);

      expect(response.body).toEqual({ data: genre });
    });

    it('should return 400 bad request', async () => {
      const genre = {};
      GenreModel.prototype.save = jest.fn().mockResolvedValue(genre);

      const response = await request(app).post('/genres').send(genre);

      expect(response.status).toEqual(400);
    });

    it('should return 500 server error', async () => {
      const genre = { name: 'New genre' };
      GenreModel.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('some error'));

      const response = await request(app).post('/genres').send(genre);

      expect(response.status).toEqual(500);
    });
  });

  describe('PUT', () => {
    it('should return 200 OK', async () => {
      const genre = { name: 'Update genre' };
      jest.spyOn(GenreModel, 'findByIdAndUpdate').mockResolvedValue(genre);

      const response = await request(app).put('/genres/123').send(genre);

      expect(response.status).toEqual(200);
    });

    it('should return updated genre', async () => {
      const genre = { name: 'Update genre' };
      jest.spyOn(GenreModel, 'findByIdAndUpdate').mockResolvedValue(genre);

      const response = await request(app).put('/genres/123').send(genre);

      expect(response.body).toEqual({ data: genre });
    });

    it('should return 404 not found', async () => {
      const genre = { name: 'Update genre' };
      jest.spyOn(GenreModel, 'findByIdAndUpdate').mockRejectedValue(null);

      const response = await request(app).put('/genres/123').send(genre);

      expect(response.status).toEqual(404);
    });
  });

  describe('DELETE', () => {
    it('should return 200 OK', async () => {
      jest.spyOn(GenreModel, 'findByIdAndDelete').mockResolvedValue(true);

      const response = await request(app).delete('/genres/123');

      expect(response.status).toEqual(200);
    });

    it('should return message "Genre deleted successfully"', async () => {
      jest.spyOn(GenreModel, 'findByIdAndDelete').mockResolvedValue(true);

      const response = await request(app).delete('/genres/123');

      expect(response.body).toEqual({ data: 'Genre deleted successfully' });
    });

    it('should return 404 not found', async () => {
      jest.spyOn(GenreModel, 'findByIdAndDelete').mockResolvedValue(null);

      const response = await request(app).delete('/genres/123');

      expect(response.status).toEqual(404);
    });

    it('should return 500 server error', async () => {
      jest
        .spyOn(GenreModel, 'findByIdAndDelete')
        .mockRejectedValue(new Error('some error'));

      const response = await request(app).delete('/genres/123');

      expect(response.status).toEqual(500);
    });
  });
});
