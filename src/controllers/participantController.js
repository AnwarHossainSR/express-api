import express from 'express';
import { 
    getParticipants, 
    createParticipant, 
    getParticipantById, 
    updateParticipant, 
    deleteParticipant
} from '../services/participantService.js';

import { authMiddleware } from '../middlewares/authMiddelwar.js';
import { checkPermission } from '../middlewares/roleMiddleware.js';
import { handleValidationErrors } from '../middlewares/validationErrorMiddleware.js';
import { body } from 'express-validator';

const router = express.Router();

const validateParticipantData = [
    body('name').isString().trim().notEmpty().withMessage('Name is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('role').isIn(['Producer', 'Actor', 'Director', 'Musician', 'Writer']).withMessage('Invalid role'),
];

router.get('/', getParticipants);
router.get('/:id', getParticipantById);
router.post('/', authMiddleware, validateParticipantData, handleValidationErrors, checkPermission('create'), createParticipant);
router.put('/:id', authMiddleware, validateParticipantData, handleValidationErrors, checkPermission('update'), updateParticipant);
router.delete('/:id', authMiddleware, checkPermission('delete'), deleteParticipant);

export default router;