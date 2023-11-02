import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const movieJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  releaseDate: Joi.date().required(),
  genre: Joi.array().items(Joi.string()).required(),
});

const validateMovie = (req: Request, res: Response, next: NextFunction) => {
  const { error } = movieJoiSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export default validateMovie;
