import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NotificationType } from 'Type/Notification';
import NotificationListComponent from './NotificationList.component';

const mapStateToProps = (state) => ({
    notifications: state.notificationReducer.notifications,
});

const mapDispatchToProps = (dispatch) => ({});

class NotificationList extends PureComponent {
    static propTypes = {
        notifications: PropTypes.arrayOf(NotificationType).isRequired,
    }

    containerProps() {
        const { notifications } = this.props;
        
        return { notifications };
    }

    renderComponent() {
        return (
            <NotificationListComponent
                { ...this.containerProps() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);