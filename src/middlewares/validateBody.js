import createHttpError from 'http-errors';
import { HTTP_STATUSES } from '../constants/index.js';


export const validateBody = (schema) => async (req, res, next) => {
  try {

    await schema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    
    const errorMessages = error.details
      .map((detail) => {
        
        return detail.message.replace(/"/g, '');
      })
      .join('; ');

    console.error(`Validation error: ${errorMessages}`);


    const httpError = createHttpError(
      HTTP_STATUSES.BAD_REQUEST, 
      'Bad request, body parameters are incorrect', 
      {
        errors: errorMessages, 
      },
    );
    next(httpError);
  }
};