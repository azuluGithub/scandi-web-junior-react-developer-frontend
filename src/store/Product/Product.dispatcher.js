import ProductQuery from 'Query/Product.query';
import { productAction, productsAction } from './Product.action';
import QueryDispatcher from 'Util/Request/QueryDispatcher';
import { PRODUCT_QUERY, CATEGORY_QUERY } from 'Util/Request/Query.config';

class ProductDispatcher extends QueryDispatcher {

  prepareRequest({ type }) {
    switch(type) {
      case CATEGORY_QUERY:
        return [
          ProductQuery.getProducts(),
        ];
  
      case PRODUCT_QUERY:
        return [
          ProductQuery.getProduct(),
        ];
        
      default:
        return [];
    }
  }

  onSuccess(dispatch, data, { type }) {
    switch(type) {
      case CATEGORY_QUERY:
        return dispatch(productsAction(data));
  
      case PRODUCT_QUERY:
        return dispatch(productAction(data));
        
      default:
        return null;
    }
  }

  onError(error, dispatch) {
    console.log(error.message);
  }
}

export default new ProductDispatcher();