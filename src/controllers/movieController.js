import express from 'express';
import { 
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
} from '../services/moviesService.js';
import { body } from 'express-validator';

import { authMiddleware } from '../middlewares/authMiddelwar.js';
import { handleValidationErrors } from '../middlewares/validationErrorMiddleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { MOVIE_GENRE } from '../constants.js';

const router = express.Router();

const validateMovieData = [
    body('movieName').isString().trim().notEmpty().withMessage('Name is required'),
    body('movieDescription').isString().trim().notEmpty().withMessage('Description is required'),
    body('movieDuration').isInt({ min: 0 }).withMessage('Duration must be a positive integer'),
    body('movieRating').isFloat({ min: 0, max: 10 }).withMessage('Ratings must be between 0 and 10'),
    body('genre').isIn(MOVIE_GENRE).withMessage('Invalid movie genre'),
];

router.get('/', rateLimiter, getMovies);
router.get('/:id', getMovieById);
router.post('/', validateMovieData, handleValidationErrors,  authMiddleware, createMovie);
router.put('/:id',  validateMovieData, handleValidationErrors, authMiddleware, updateMovie);
router.delete('/:id',authMiddleware, deleteMovie);

export default router;