import CurrencyQuery from '../../query/Currency.query';
import QueryDispatcher from '../../util/Request/QueryDispatcher';
import { currencyAction } from './Currency.action';

class CurrencyDispatcher extends QueryDispatcher {
  prepareRequest() {
    return [
      CurrencyQuery.getCurrencies(),
    ]
  }

  onSuccess(dispatch, data, args) {
    dispatch(currencyAction(data));
  }

  onError(dispatch, error) {
    console.log(error.message);
  }
}

export default CurrencyDispatcher;