export const SHOW_NOTIFICATION_TYPE = 'SHOW_NOTIFICATION_TYPE';
export const HIDE_NOTIFICATION_TYPE = 'HIDE_NOTIFICATION_TYPE';

export const showNotificationAction = (notification) => ({
  type: SHOW_NOTIFICATION_TYPE,
  payload: notification,
});

export const hideNotificationAction = (notificationsId) => ({
  type: HIDE_NOTIFICATION_TYPE,
  payload: notificationsId,
});