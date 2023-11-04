import mongoose from 'mongoose';

export interface CustomError {
  status: number;
  message: string;
}

export interface Product {
  id: string;
  name: string;
}

export interface Movie {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string[];
}

export interface Genre {
  _id: mongoose.Types.ObjectId;
  name: string;
}
