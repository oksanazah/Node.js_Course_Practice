import { Schema, model } from 'mongoose';
import Joi from 'joi';

const GenreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false },
);

const genreJoiSchema = Joi.object({
  name: Joi.string().required(),
});

const GenreModel = model('Genre', GenreSchema);

export { genreJoiSchema, GenreModel };
