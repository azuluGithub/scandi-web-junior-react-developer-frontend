import {
    SHOW_NOTIFICATION_TYPE, 
    HIDE_NOTIFICATION_TYPE
} from './Notification.action';


const initNotifications = () => ({
    notifications: [],
});

const initialNotificationState = () => ({
    ...initNotifications(),
});


export const notificationReducer = (state = initialNotificationState(), action = {}) => {
    const { type, payload } = action;
    
    switch (type) {
        case SHOW_NOTIFICATION_TYPE:
            return { 
                ...state,
                notifications: [ ...state.notifications, payload ],
            };

        case HIDE_NOTIFICATION_TYPE:
            const filteredList = state.notifications.filter(({ notificationsId }) => notificationsId !== payload);
            
            return { 
                ...state,
                notifications: filteredList,
            };

      default:
        return state;
    }
}

