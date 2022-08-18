export const CATEGORIES_TYPE = 'CATEGORIES_TYPE';

export const categoryAction = (categories) => ({
  type: CATEGORIES_TYPE,
  payload: categories,
});
