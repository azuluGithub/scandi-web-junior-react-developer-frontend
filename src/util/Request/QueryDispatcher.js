import { prepareQuery } from '../../util/Query/PrepareDocument';
import { executeGet } from '../../util/Request/Request';

class QueryDispatcher {

  requestData(dispatch, args = {}) {
    const reqRes = this.prepareRequest(args);
    const queryRes = prepareQuery(reqRes, args);
    const graphqlRes = executeGet(queryRes, args);

    graphqlRes.then(
      (data) => this.onSuccess(dispatch, data, args),
      (error) => this.onError(dispatch, error),
    );
  }

  prepareRequest() {}

  onSuccess(dispatch, data, args) {}

  onError(dispatch, error) {}

}

export default QueryDispatcher;
