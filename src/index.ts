import express, { Request, Response, Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import swaggerSpec from './utils/swagger';
import errorHandler from './middleware/error-handler';
import healthChekcRouter from './routes/health-check.routes';
import moviesRouter from './routes/movies.routes';
import genresRouter from './routes/genres.routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  return res.send('Hello World!');
});

app.use('/health-check', healthChekcRouter);

app.use('/movies', moviesRouter);

app.use('/genres', genresRouter);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to Database');

      app.listen(PORT, (): void => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.log('Connection failed');
      console.log(err);
    });
}

export default app;
