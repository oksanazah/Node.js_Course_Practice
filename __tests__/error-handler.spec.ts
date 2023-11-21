import { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import app from '../src/index';
import { CustomError } from 'src/interfaces/interfaces';
import errorHandler from '../src/middleware/error-handler';

describe('error-handler middleware', () => {
  const mockRequest: Request = {} as Request;
  const mockResponse: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const mockNext: NextFunction = jest.fn();

  const error: CustomError = {
    status: 401,
    message: 'error',
  };

  it('should return 404 not found', async () => {
    const response = await request(app).get('/movies/123');

    expect(response.status).toBe(404);
  });

  it('should return message "Not found"', async () => {
    const response = await request(app).get('/movies/123');

    expect(response.body).toStrictEqual({ error: 'Not found' });
  });

  it('should return error with status and message', () => {
    errorHandler(error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
  });
});
