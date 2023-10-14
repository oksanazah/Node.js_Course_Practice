import express, { Request, Response, Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './utils/swagger';
import errorHandler from './middleware/error-handler';
import healthChekcRouter from './routes/health-check.routes';
import productsRouter from './routes/products.routes';

const app: Express = express();
const PORT = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response): void => {
	res.send('Hello World!');
});

app.use('/health-check', healthChekcRouter);

app.use('/products', productsRouter);

app.use(errorHandler);

app.listen(PORT, (): void => {
	console.log(`Server is running on port ${PORT}`);
});
