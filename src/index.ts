import { Request, Response, NextFunction } from 'express';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import { products } from './products';
import { Error, Product } from './model';

const app: Express = express();
const PORT = 3000;

const options: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'NodeJS project API',
			version: '1.0.0',
		},
	},
	apis: ['./src/index.ts'],
};

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response): void => {
	res.send('Hello World!');
});

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check that server is running
 *     responses:
 *       200:
 *         description: Server is running
 *       500:
 *         description: Internal Server Error
 */
app.get('/health-check', (req: Request, res: Response): void => {
	res.status(200).json({ status: 'server is running' });
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products' list
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Internal Server Error
 */
app.get('/products', (req: Request, res: Response): void => {
	res.status(200).json({ data: products });
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
app.get('/products/:id', (req: Request, res: Response): void => {
	const productId = req.params.id;
	const product = products.find((item: Product): boolean => item.id === productId);

	if (!product) {
		res.status(404).json({ error: 'Product not found' });
	} else {
		res.status(200).json({ id: productId, data: product.name });
	}
});

app.use((error: Error, req: Request, res: Response, next: NextFunction): void => {
	if (error.status) {
		res.status(error.status).json({ message: error.message });
	}

	res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, (): void => {
	console.log(`Server is running on port ${PORT}`);
});
