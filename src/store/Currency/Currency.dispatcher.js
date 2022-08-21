import CurrencyQuery from 'Query/Currency.query';
import QueryDispatcher from 'Util/Request/QueryDispatcher';
import { currencyAction } from './Currency.action';
import { showNotificationAction } from 'Store/Notification/Notification.action';
import {  NOTIFICATION_FAILURE_TYPE } from 'Component/Notification/Notification.config';

class CurrencyDispatcher extends QueryDispatcher {
  prepareRequest() {
    return [
      CurrencyQuery.getCurrencies(),
    ]
  }

  onSuccess(dispatch, data) {
    dispatch(currencyAction(data));
  }

  onError(dispatch, error) {
    const notification = {
      notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
      type: NOTIFICATION_FAILURE_TYPE,
      message: 'Failed to load Currencies.',
    }
    dispatch(showNotificationAction(notification));
  }
}

export default new CurrencyDispatcher();