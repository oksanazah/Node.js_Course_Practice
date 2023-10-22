import express, { Request, Response, Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

import swaggerSpec from './utils/swagger';
import errorHandler from './middleware/error-handler';
import healthChekcRouter from './routes/health-check.routes';
import productsRouter from './routes/products.routes';
import moviesRouter from './routes/movies.routes';
import genresRouter from './routes/genres.routes';

const app: Express = express();
const PORT = 3000;
const MONGODB_URI =
  'mongodb+srv://oksanazaharchenko:4bIg0tLnbnA5edNR@cluster0.voxnl81.mongodb.net/NODE_JS_DB?retryWrites=true&w=majority';

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  return res.send('Hello World!');
});

app.use('/health-check', healthChekcRouter);

app.use('/products', productsRouter);

app.use('/movies', moviesRouter);

app.use('/genres', genresRouter);

app.use(errorHandler);

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
