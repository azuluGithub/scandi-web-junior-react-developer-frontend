import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { NotificationType } from 'Type/Notification';
import { NOTIFICATION_SUCCESS_TYPE, NOTIFICATION_TIME_OUT_DURATION } from './Notification.config';

import './Notification.style.scss';

class NotificationComponent extends PureComponent {
    static propTypes = {
        notification: NotificationType.isRequired,
        hideNotification: PropTypes.func.isRequired,
    }

    renderNotification() {
        const { 
            notification: { type, message }, 
            hideNotification 
        } = this.props;

        setTimeout(() => {
            if (message.length) {
                hideNotification();
            }
        }, NOTIFICATION_TIME_OUT_DURATION);

        const notificationClass = type === NOTIFICATION_SUCCESS_TYPE 
                            ? 'Notification_Success' 
                            : 'Notification_Failure';

        return (
            <div className={`Notification ${notificationClass}`}>
                { message }
            </div>
        );
    }

    render() {
        return this.renderNotification();
    }
}

export default NotificationComponent;