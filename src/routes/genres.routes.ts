import { Router, Request, Response, NextFunction } from 'express';

import { GenreModel } from '../models/genres.schemas';
import { Genre } from '../models/models';

const router: Router = Router();

/**
 * @swagger
 *    tags:
 *    name: Genres
 * /genres:
 *   get:
 *     summary: Get genres list
 *     tags:
 *       - Genres
 *     responses:
 *       200:
 *         description: List of genres
 *         content:
 *           application/json:
 *             example:
 *               - name: Action
 *               - name: Drama
 *       404:
 *         description: Genres not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  GenreModel.find()
    .then((genres: Genre[]) => {
      if (genres.length === 0) {
        return res.status(200).json({ data: 'Genres not added yet' });
      }

      return res.status(200).json({ data: genres });
    })
    .catch(error => next(error));
});

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create new genre
 *     tags:
 *       - Genres
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: New genre
 *     responses:
 *       201:
 *         description: Genre created successfully
 *         content:
 *           application/json:
 *             example:
 *               name: New genre
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const genre = new GenreModel({ name });

  genre
    .save()
    .then((genre: Genre | null) => {
      return res.status(201).json({ data: genre });
    })
    .catch(error => next(error));
});

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Update genre
 *     tags:
 *       - Genres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the genre to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Updated genre
 *     responses:
 *       200:
 *         description: Genre updated successfully
 *         content:
 *           application/json:
 *             example:
 *               name: Updated genre
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  const genreId = req.params.id;

  GenreModel.findByIdAndUpdate(genreId, req.body)
    .then((genre: Genre | null) => {
      return res.status(200).json({ data: genre });
    })
    .catch(error => next(error));
});

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Delete genre
 *     tags:
 *       - Genres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the genre to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Genre deleted successfully
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const genreId = req.params.id;

  GenreModel.findByIdAndDelete(genreId)
    .then((genre: Genre | null) => {
      return res.status(200).json({ data: 'Genre deleted successfully' });
    })
    .catch(error => next(error));
});

export default router;
