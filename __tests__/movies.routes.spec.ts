import request from 'supertest';
import app from '../src/index';
import { MovieModel } from '../src/models/movies.schemas';
import { mockMovie, mockMovies } from './mock-data';

describe('/movies', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET', () => {
    it('should return 200 OK', async () => {
      jest.spyOn(MovieModel, 'find').mockResolvedValue(mockMovies);

      const response = await request(app).get('/movies');

      expect(response.status).toBe(200);
    });

    it('should return movies', async () => {
      jest.spyOn(MovieModel, 'find').mockResolvedValue(mockMovies);

      const response = await request(app).get('/movies');

      expect(response.body).toEqual({ data: mockMovies });
    });

    it('should return message "Movies not added yet"', async () => {
      jest.spyOn(MovieModel, 'find').mockResolvedValue([]);

      const response = await request(app).get('/movies');

      expect(response.body).toEqual({ data: 'Movies not added yet' });
    });

    it('should return 500 server error', async () => {
      jest.spyOn(MovieModel, 'find').mockRejectedValue(new Error('some error'));

      const response = await request(app).get('/movies');

      expect(response.status).toEqual(500);
    });
  });

  describe('GET /:id', () => {
    it('should return 200 OK', async () => {
      jest.spyOn(MovieModel, 'findById').mockResolvedValue(mockMovie);

      const response = await request(app).get('/movies/123');

      expect(response.status).toBe(200);
    });

    it('should return movie', async () => {
      jest.spyOn(MovieModel, 'findById').mockResolvedValue(mockMovie);

      const response = await request(app).get('/movies/123');

      expect(response.body).toEqual({ data: mockMovie });
    });

    it('should return 500 server error', async () => {
      jest
        .spyOn(MovieModel, 'findById')
        .mockRejectedValue(new Error('some error'));

      const response = await request(app).get('/movies/123');

      expect(response.status).toEqual(500);
    });
  });

  describe('POST', () => {
    it('should return 201 OK', async () => {
      MovieModel.prototype.save = jest.fn().mockResolvedValue(mockMovie);

      const response = await request(app).post('/movies').send(mockMovie);

      expect(response.status).toEqual(201);
    });

    it('should return created movie', async () => {
      MovieModel.prototype.save = jest.fn().mockResolvedValue(mockMovie);

      const response = await request(app).post('/movies').send(mockMovie);

      expect(response.body).toEqual({ data: mockMovie });
    });

    it('should return 400 bad request', async () => {
      const movie = {};
      MovieModel.prototype.save = jest.fn().mockResolvedValue(movie);

      const response = await request(app).post('/movies').send(movie);

      expect(response.status).toEqual(400);
    });

    it('should return 500 server error', async () => {
      MovieModel.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error('some error'));

      const response = await request(app).post('/movies').send(mockMovie);

      expect(response.status).toEqual(500);
    });
  });

  describe('PUT', () => {
    it('should return 200 OK', async () => {
      jest.spyOn(MovieModel, 'findByIdAndUpdate').mockResolvedValue(mockMovie);

      const response = await request(app).put('/movies/123').send(mockMovie);

      expect(response.status).toEqual(200);
    });

    it('should return updated movie', async () => {
      jest.spyOn(MovieModel, 'findByIdAndUpdate').mockResolvedValue(mockMovie);

      const response = await request(app).put('/movies/123').send(mockMovie);

      expect(response.body).toEqual({ data: mockMovie });
    });

    it('should return 404 not found', async () => {
      jest.spyOn(MovieModel, 'findByIdAndUpdate').mockRejectedValue(null);

      const response = await request(app).put('/movies/123').send(mockMovie);

      expect(response.status).toEqual(404);
    });
  });

  describe('DELETE', () => {
    it('should return 200 OK', async () => {
      jest.spyOn(MovieModel, 'findByIdAndDelete').mockResolvedValue(true);

      const response = await request(app).delete('/movies/123');

      expect(response.status).toEqual(200);
    });

    it('should return message "Movie deleted successfully"', async () => {
      jest.spyOn(MovieModel, 'findByIdAndDelete').mockResolvedValue(true);

      const response = await request(app).delete('/movies/123');

      expect(response.body).toEqual({ data: 'Movie deleted successfully' });
    });

    it('should return 404 not found', async () => {
      jest.spyOn(MovieModel, 'findByIdAndDelete').mockResolvedValue(null);

      const response = await request(app).delete('/movies/123');

      expect(response.status).toEqual(404);
    });

    it('should return 500 server error', async () => {
      jest
        .spyOn(MovieModel, 'findByIdAndDelete')
        .mockRejectedValue(new Error('some error'));

      const response = await request(app).delete('/movies/123');

      expect(response.status).toEqual(500);
    });
  });

  describe('GET /genre/:genreName', () => {
    it('should return 200 OK', async () => {
      jest.spyOn(MovieModel, 'find').mockResolvedValue(mockMovies);

      const response = await request(app).get('/movies/genre/action');

      expect(response.status).toBe(200);
    });

    it('should return movies by genre', async () => {
      jest.spyOn(MovieModel, 'find').mockResolvedValue(mockMovies);

      const response = await request(app).get('/movies/genre/action');

      expect(response.body).toEqual({ data: mockMovies });
    });

    it('should return message "Movies by this genre not added yet"', async () => {
      jest.spyOn(MovieModel, 'find').mockResolvedValue([]);

      const response = await request(app).get('/movies/genre/action');

      expect(response.body).toEqual({
        data: 'Movies by this genre not added yet',
      });
    });

    it('should return 500 server error', async () => {
      jest.spyOn(MovieModel, 'find').mockRejectedValue(new Error('some error'));

      const response = await request(app).get('/movies/genre/action');

      expect(response.status).toEqual(500);
    });
  });
});
