import { Router, Request, Response } from 'express';

import { products } from '../data/products';
import { Product } from '../interfaces/interfaces';

const router: Router = Router();

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
router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ data: products });
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
router.get('/:id', (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = products.find(
    (item: Product): boolean => item.id === productId,
  );

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.status(200).json({ id: productId, data: product.name });
});

export default router;
