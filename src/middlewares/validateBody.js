import createHttpError from 'http-errors';
import { HTTP_STATUSES } from '../constants/index.js';

export const validateBody = (schema) => async (req, res, next) => {
  try {
 
    await schema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
   
    const errorMessages = error.details.map((detail) => {
      return `${detail.message} (field: ${detail.context.key})`; 
    });


    console.error(`Validation error: ${errorMessages.join('; ')}`);


    const httpError = createHttpError(
      HTTP_STATUSES.BAD_REQUEST,
      'Bad request, the body parameters are incorrect. See details below:',
      {
        errors: errorMessages, 
      }
    );


    next(httpError);
  }
};