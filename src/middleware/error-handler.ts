import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';

import { CustomError } from '../interfaces/interfaces';

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
