const CONTACT_TYPE = ['work', 'home', 'personal'];


const parseContactType = (type) => {
  if (typeof type === 'string' && CONTACT_TYPE.includes(type)) {
    return type;
  }
  return null; 
};

const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined; 
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  return {
    type: parseContactType(type),
    isFavourite: parseBoolean(isFavourite),
  };
};