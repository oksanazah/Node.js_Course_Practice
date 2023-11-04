import { Schema, model } from 'mongoose';
import Joi from 'joi';

const MovieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false },
);

const movieJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  releaseDate: Joi.date().required(),
  genre: Joi.array().items(Joi.string()).required(),
});

const MovieModel = model('Movie', MovieSchema);

export { movieJoiSchema, MovieModel };
