import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'FAILURE',
            message: 'Validation errors',
            errors: errors.array()
        });
    }
    next();
};

export default handleValidationErrors;
    