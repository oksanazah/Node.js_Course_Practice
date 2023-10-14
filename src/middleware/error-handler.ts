import { Request, Response, NextFunction } from 'express';

import { Error } from '../models/models';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
	if (error.status) {
		res.status(error.status).json({ message: error.message });
	}

	res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
