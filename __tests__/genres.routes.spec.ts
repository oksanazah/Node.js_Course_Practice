import request from 'supertest';
import app from '../src/index';
import { GenreModel } from '../src/models/genres.schemas';

describe('/genres', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET', () => {
    it('should return 200 OK', async () => {
      jest.spyOn(GenreModel, 'find').mockResolvedValue([{ name: 'some' }]);

      const response = await request(app).get('/genres');

      expect(response.status).toBe(200);
    });

    it('should return genres', async () => {
      jest.spyOn(GenreModel, 'find').mockResolvedValue([{ name: 'some' }]);

      const response = await request(app).get('/genres');

      expect(response.body).toEqual({ data: [{ name: 'some' }] });
    });

    it('should return message "Genres not added yet"', async () => {
      jest.spyOn(GenreModel, 'find').mockResolvedValue([]);

      const response = await request(app).get('/genres');

      expect(response.body).toEqual({ data: 'Genres not added yet' });
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
  });
});
