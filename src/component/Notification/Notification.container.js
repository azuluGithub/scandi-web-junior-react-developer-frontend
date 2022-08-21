import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideNotificationAction } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Type/Notification';
import NotificationComponent from './Notification.component';

const mapStateToProps = (state) => ({
    notifications: state.notificationReducer.notifications,
});

const mapDispatchToProps = (dispatch) => ({
    hideNotificationAction: (id) => dispatch(hideNotificationAction(id)),
});

class Notification extends PureComponent {
    static propTypes = {
        notification: NotificationType.isRequired,
        hideNotificationAction: PropTypes.func.isRequired,
    }

    containerProps() {
        const { notification } = this.props;
        
        return { notification };
    }

    containerFunctions() {
        return {
            hideNotification: this.hideNotification.bind(this),
        }
    }

    hideNotification() {
        const { 
            hideNotificationAction, 
            notification: { notificationsId } 
        } = this.props;

        hideNotificationAction(notificationsId);
    }

    renderComponent() {
        return (
            <NotificationComponent
                { ...this.containerProps() }
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);