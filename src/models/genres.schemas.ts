import { Schema, model } from 'mongoose';

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const GenreModel = model('Genre', GenreSchema);
