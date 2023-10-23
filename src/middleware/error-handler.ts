import { Request, Response, NextFunction } from 'express';
import { MongooseError, Error } from 'mongoose';
import { MongoServerError } from 'mongodb';

import { CustomError } from '../models/models';

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof Error.ValidationError) {
    return res.status(400).json({ error: 'Fill in all required fields' });
  }

  if (error instanceof MongoServerError && error.code === 11000) {
    return res.status(400).json({ error: 'Field must be unique' });
  }

  if (error instanceof MongooseError) {
    return res.status(404).json({ error: 'Not found' });
  }

  if ((error as CustomError).status) {
    return res
      .status((error as CustomError).status)
      .json({ message: (error as CustomError).message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
