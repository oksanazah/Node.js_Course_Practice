import { Schema, model } from 'mongoose';

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

export const GenreModel = model('Genre', GenreSchema);
