import { Router, Request, Response, NextFunction } from 'express';

import { MovieModel } from '../models/movies.schemas';
import { Movie } from '../models/models';

const router: Router = Router();

/**
 * @swagger
 *    tags:
 *    name: Movies
 * /movies:
 *   get:
 *     summary: Get movies list
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             example:
 *               - title: Some Movie
 *                 description: Description
 *                 releaseDate: 2023-10-01
 *                 genre: Action
 *               - title: Other Movie
 *                 description: Description
 *                 releaseDate: 2023-10-01
 *                 genre: Drama
 *       404:
 *         description: Movies not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  MovieModel.find()
    .then((movies: Movie[]) => {
      if (movies.length === 0) {
        return res.status(200).json({ data: 'Movies not added yet' });
      }

      return res.status(200).json({ data: movies });
    })
    .catch(error => next(error));
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie by id
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie
 *         content:
 *           application/json:
 *             example:
 *               title: Some Movie
 *               description: Description
 *               releaseDate: 2023-10-01
 *               genre: Action
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.id;

  MovieModel.findById(movieId)
    .then((movie: Movie | null) => {
      return res.status(200).json({ data: movie });
    })
    .catch(error => next(error));
});

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create new movie
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: New Movie
 *             description: Description
 *             releaseDate: 2023-10-01
 *             genre: Drama
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             example:
 *               title: New Movie
 *               description: Description
 *               releaseDate: 2023-10-01
 *               genre: Drama
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { title, description, releaseDate, genre } = req.body;

  const movie = new MovieModel({ title, description, releaseDate, genre });

  movie
    .save()
    .then((movie: Movie | null) => {
      return res.status(201).json({ data: movie });
    })
    .catch(error => next(error));
});

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update movie
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Updated Movie
 *             description: Description
 *             releaseDate: 2023-10-01
 *             genre: Drama
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             example:
 *               title: Updated Movie
 *               description: Description
 *               releaseDate: 2023-10-01
 *               genre: Drama
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.id;

  MovieModel.findByIdAndUpdate(movieId, req.body)
    .then((movie: Movie | null) => {
      return res.status(200).json({ data: movie });
    })
    .catch(error => next(error));
});

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete movie
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.id;

  MovieModel.findByIdAndDelete(movieId)
    .then((movie: Movie | null) => {
      return res.status(200).json({ data: 'Movie deleted successfully' });
    })
    .catch(error => next(error));
});

/**
 * @swagger
 * /movies/genre/{genreName}:
 *   get:
 *     summary: Get movies by genre
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: genreName
 *         required: true
 *         description: The name of the genre for movies search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of movies with the corresponding genre
 *         content:
 *           application/json:
 *             example:
 *               - title: Some Movie
 *                 description: Description
 *                 releaseDate: 2023-10-01
 *                 genre: Action
 *               - title: Other Movie
 *                 description: Description
 *                 releaseDate: 2023-10-01
 *                 genre: Action
 *       404:
 *         description: Movies not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  '/genre/:genreName',
  (req: Request, res: Response, next: NextFunction) => {
    const genreName = req.params.genreName;

    MovieModel.find({ genre: genreName })
      .then((movies: Movie[]) => {
        if (movies.length === 0) {
          return res
            .status(200)
            .json({ data: 'Movies by this genre not added yet' });
        }

        return res.status(200).json({ data: movies });
      })
      .catch(error => next(error));
  },
);

export default router;
