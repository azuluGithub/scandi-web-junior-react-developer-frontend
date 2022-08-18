import CategoryQuery from '../../query/Category.query';
import QueryDispatcher from '../../util/Request/QueryDispatcher';
import { categoryAction } from './Category.action';

class CategoryDispatcher extends QueryDispatcher {

  prepareRequest() {
    return [
      CategoryQuery.getCategories(),
    ]
  }

  onSuccess(dispatch, data) {
    dispatch(categoryAction(data));
  }

  onError(dispatch, error) {
    console.log('Error' , error.message);
  }
}

export default CategoryDispatcher;