import { isHttpError } from 'http-errors';
import { HTTP_STATUSES } from '../constants/index.js';
import { MongooseError } from 'mongoose';

export const errorHandler = (error, req, res, next) => {
    let statusCode = HTTP_STATUSES.INTERNAL_SERVER_ERROR; 

    
    
    if (isHttpError(error)) {
    statusCode = error.status || statusCode;
    return res.status(statusCode).json({
        status: statusCode,
        message: error.name || 'HttpError',
        data: error.message,
    });
}


    if (error instanceof MongooseError) {
    return res.status(statusCode).json({
        status: statusCode,
        message: 'Mongoose error',
        data: { message: error.message },
    });
}


    return res.status(statusCode).json({
    status: statusCode,
    message: 'Something went wrong',
    data: { message: error.message },
    });
};
