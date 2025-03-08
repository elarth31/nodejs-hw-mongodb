import Joi from 'joi';
import { JOI_VALIDATION_MSG, VALIDATION_LENGTH } from '../constants/index.js';

const { MIN, MAX, ONE_OF, REQUIRED, STRING, BOOLEAN, PHONE_NUMBER, EMAIL } = JOI_VALIDATION_MSG;
const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_LENGTH;

const phoneNumberPattern = /^\+?\d[\d-]*\d$/;


const createCommonMessages = (fieldName) => ({
  'string.base': `${fieldName} must be a string. You provided: '{{#value}}'`,
  'string.min': MIN,
  'string.max': MAX,
  'any.required': REQUIRED,
});

const createEmailMessages = () => ({
  'string.base': STRING,
  'string.min': MIN,
  'string.max': MAX,
  'string.email': EMAIL,
});

const createBooleanMessages = () => ({
  'boolean.base': BOOLEAN,
});

export const createContactSchema = Joi.object({
  name: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required().messages(createCommonMessages('Name')),
  phoneNumber: Joi.string()
    .min(MIN_LENGTH)
    .max(MAX_LENGTH)
    .pattern(phoneNumberPattern)
    .required()
    .messages({
      ...createCommonMessages('Phone number'),
      'string.pattern.base': PHONE_NUMBER,
    }),
  email: Joi.string()
    .min(MIN_LENGTH)
    .max(MAX_LENGTH)
    .email({ tlds: { allow: false } })
    .messages(createEmailMessages()),
  isFavourite: Joi.boolean()
    .default(false)
    .messages(createBooleanMessages()),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .required()
    .messages({
      'string.base': STRING,
      'any.only': ONE_OF,
      'any.required': REQUIRED,
    }),
});


export const updateContactSchema = Joi.object({
  name: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH).messages(createCommonMessages('Name')),
  phoneNumber: Joi.string()
    .min(MIN_LENGTH)
    .max(MAX_LENGTH)
    .pattern(phoneNumberPattern)
    .messages({
      ...createCommonMessages('Phone number'),
      'string.pattern.base': PHONE_NUMBER,
    }),
  email: Joi.string()
    .min(MIN_LENGTH)
    .max(MAX_LENGTH)
    .email({ tlds: { allow: false } })
    .messages(createEmailMessages()),
  isFavourite: Joi.boolean()
    .default(false)
    .messages(createBooleanMessages()),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .messages({
      'string.base': STRING,
      'any.only': ONE_OF,
    }),
});