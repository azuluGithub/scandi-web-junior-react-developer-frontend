export const PRODUCT_TYPE = 'PRODUCT_TYPE';
export const PRODUCTS_TYPE = 'PRODUCTS_TYPE';
export const REMOVE_PRODUCT_TYPE = 'REMOVE_PRODUCT_TYPE';

export const productAction = (product) => ({
  type: PRODUCT_TYPE,
  payload: product,
});

export const removeProductAction = () => ({
  type: REMOVE_PRODUCT_TYPE,
});

export const productsAction = (products) => ({
  type: PRODUCTS_TYPE,
  payload: products,
});