import BrowserDatabase from '../../util/BrowserDatabase/BrowserDatabase';
import { CATEGORIES_TYPE } from './Category.action';

const getCategories = () => {
  const initData = { categories: [] };
  const data = BrowserDatabase.getItem('categories');

  return data ? data : initData;
}

const initialCategoriesState = () => ({
  ...getCategories(),
  categoriesIsLoading: true,
});

const setCategories = (data) =>  {
  BrowserDatabase.setItem('categories', data);
}

export const categoriesReducer = (state = initialCategoriesState(), action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_TYPE:
      setCategories(payload);
      
      return { 
        ...state,
        ...payload,
        categoriesIsLoading: false,
      };
      
    default:
      return state;
  }
}
