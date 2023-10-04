const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { products } = require('./products');

const app = express();
const PORT = 3000;

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'NodeJS project API',
			version: '1.0.0',
		},
	},
	apis: ['./src/index.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
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
app.get('/health-check', (req, res) => {
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
app.get('/products', (req, res) => {
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
app.get('/products/:id', (req, res) => {
	const productId = req.params.id;
	const product = products.find((item) => item.id === productId);

	if (!product) {
		res.status(404).json({ error: 'Product not found' });
	}

	res.status(200).json({ id: productId, data: product.name });
});

app.use((req, res, next) => {
	res.status(404).send('404 Not Found');
});

app.use((req, res, next) => {
	res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
