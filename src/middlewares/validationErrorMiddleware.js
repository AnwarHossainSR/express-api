import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    const errorArray = errors.array().map(err => err.msg);
    if (errorArray.length > 0) {
        res.status(400).json(errorArray);
        return;
    }
    next();   
};