import { Schema, model } from 'mongoose';

const MovieSchema = new Schema({
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
});

export const MovieModel = model('Movie', MovieSchema);
