import { Request, Response, NextFunction } from 'express';

import { Error } from '../models/models';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
