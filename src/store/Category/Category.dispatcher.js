import CategoryQuery from 'Query/Category.query';
import QueryDispatcher from 'Util/Request/QueryDispatcher';
import { showNotificationAction } from 'Store/Notification/Notification.action';
import {  NOTIFICATION_FAILURE_TYPE } from 'Component/Notification/Notification.config';
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
    const notification = {
        notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
        type: NOTIFICATION_FAILURE_TYPE,
        message: 'Failed to load Categories.',
    }
    dispatch(showNotificationAction(notification));
  }
}

export default new CategoryDispatcher();