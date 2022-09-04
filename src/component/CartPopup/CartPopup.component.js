import { PureComponent } from 'react';

import Popup from '../Popup';
import { PopupType } from 'Type/Popup';

import './CartPopup.style.scss';

class CartPopupComponent extends PureComponent {
    static propTypes = {
        popup: PopupType,
    }

    renderPopup() {
        const { popup } = this.props;

        return <Popup popup={popup}/>;
    }

    renderCartPopupComponent() {
        const { popup } = this.props;

        if (!popup) {
            return ;
        }

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