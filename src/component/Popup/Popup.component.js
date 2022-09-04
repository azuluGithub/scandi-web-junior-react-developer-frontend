import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { PopupType } from 'Type/Popup';
import './Popup.style.scss';

class NotificationComponent extends PureComponent {
    static propTypes = {
        popup: PopupType.isRequired,
        handleCancel: PropTypes.func.isRequired,
        handleDelete: PropTypes.func.isRequired,
    }

    renderCancelButton() {
        const { handleCancel } = this.props;

        return (
            <button
                onClick={() => handleCancel()}
                className="Popup-Cancel Button"
            >
                {'Cancel'}
            </button>
        );
    }

    renderDeleteButton() {
        const { handleDelete } = this.props;

        return (
            <button
                onClick={() => handleDelete()}
                className="Popup-Delete Button"
            >
                {'Remove'}
            </button>
        );
    }

    renderButtons() {
        return (
            <div className='Popup-Buttons'>
                { this.renderCancelButton() }
                { this.renderDeleteButton() }
            </div>
        );
    }

    renderPopup() {
        const { popup: { message } } = this.props;

        return (
            <div className='Popup'>
                <p className='Popup-Message'>{ message }</p>
                { this.renderButtons() }
            </div>
        );
    }

    render() {
        return this.renderPopup();
    }
}

export default NotificationComponent;