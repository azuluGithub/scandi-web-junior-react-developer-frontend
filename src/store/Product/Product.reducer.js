import { 
  PRODUCT_TYPE, 
  PRODUCTS_TYPE,
  REMOVE_PRODUCT_TYPE,
} from './Product.action';

const initialProductState = () => ({
  product: null,
  products: [],
  productIsLoading: true,
});

export const productsReducer = (state = initialProductState(), action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_TYPE:
      return { 
        ...state,
        ...payload,
        productIsLoading: false,
      };

    case REMOVE_PRODUCT_TYPE:
      return { 
        ...state,
        product: null,
    };
      
    case PRODUCTS_TYPE:
      const { category: { products} } = payload;
      
      return { 
        ...state,
        products,
        productIsLoading: false,
      };

    default:
      return state;
  }
}