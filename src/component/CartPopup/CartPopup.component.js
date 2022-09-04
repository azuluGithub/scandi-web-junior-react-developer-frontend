import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup';
import { PopupType } from 'Type/Popup';

import './CartPopup.style.scss';

class CartPopupComponent extends PureComponent {
    static propTypes = {
        popup: PopupType,
        handleOverLay: PropTypes.func.isRequired,
    }

    renderPopup() {
        const { popup } = this.props;

        return <Popup popup={popup}/>;
    }

    renderCartPopupComponent() {
        const { popup, handleOverLay } = this.props;

        if (!popup) {
            return ;
        }

        handleOverLay();

        return (
            <div className='CartPopup'>
                { this.renderPopup() }
            </div>
        );
    }

    render() {
        return this.renderCartPopupComponent();
    }
}

export default CartPopupComponent;