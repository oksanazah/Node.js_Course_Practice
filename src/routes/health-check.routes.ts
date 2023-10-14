import { Router, Request, Response } from 'express';

const router: Router = Router();

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
router.get('/', (req: Request, res: Response): void => {
	res.status(200).json({ status: 'server is running' });
});

export default router;
