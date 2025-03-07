import { DEFAULT_PAGINATION_DATA } from '../constants/index.js';

const parseNumber = (value, defaultValue) => {
  if (typeof value !== 'string') return defaultValue;

  const parsedNumber = parseInt(value, 10); 

  if (Number.isNaN(parsedNumber) || parsedNumber <= 0) return defaultValue;

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  return {
    page: parseNumber(page, DEFAULT_PAGINATION_DATA.PAGE),
    perPage: parseNumber(perPage, DEFAULT_PAGINATION_DATA.PER_PAGE),
  };
};