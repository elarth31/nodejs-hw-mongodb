import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { HTTP_STATUSES } from '../constants/index.js';

export const isValidId = (idName = 'id') => (req, res, next) => {
    const id = req.params[idName];
    console.log('Received ID: ', id);

    if (!id) {
    return next(createHttpError(400, `${idName} is not provided`));
  }

    if (!isValidObjectId(id))
      return next(
        createHttpError(
          HTTP_STATUSES.NOT_FOUND,
          `Invalid ID: '${id}' provided. Expected a valid 24-character MongoDB ObjectId.`,
        ),
      );

    return next();
  };