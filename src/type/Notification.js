import PropTypes from 'prop-types';

export const NotificationType = PropTypes.shape({
    notificationsId: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string,
});