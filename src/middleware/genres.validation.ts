import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const genreJoiSchema = Joi.object({
  name: Joi.string().required(),
});

const validateGenre = (req: Request, res: Response, next: NextFunction) => {
  const { error } = genreJoiSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export default validateGenre;
