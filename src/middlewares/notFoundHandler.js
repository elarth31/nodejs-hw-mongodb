import createHttpError from 'http-errors';
import { HTTP_STATUSES } from '../constants/index.js';

export const notFoundHandler = (req, res, next) => {

    const error = createHttpError(HTTP_STATUSES.NOT_FOUND, 'Route not found');

    res.status(error.status).json({
    status: error.status,
    message: error.message,
    });
};

