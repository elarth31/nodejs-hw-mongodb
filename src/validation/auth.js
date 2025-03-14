import Joi from 'joi';
import { JOI_VALIDATION_MSG, VALIDATION_LENGTH } from '../constants/index.js';

const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_LENGTH;
const { MIN, MAX, STRING, EMAIL } = JOI_VALIDATION_MSG;

export const registerUserSchema = Joi.object({
  name: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required().messages({
    'string.base': STRING,
    'string.min': MIN,
    'string.max': MAX,
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': STRING,
      'string.email': EMAIL,
    }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password must be at most 30 characters long',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.base': STRING,
    'string.email': EMAIL,
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password is required',
  }),
});
