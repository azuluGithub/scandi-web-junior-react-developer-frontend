import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { PopupType } from 'Type/Popup';
import CartPopupComponent from './CartPopup.component';
import { overlayAction } from 'Store/Overlay/Overlay.action';

const mapStateToProps = (state) => ({
    popup: state.popupReducer.popup,
});

const mapDispatchToProps = (dispatch) => ({
    overlayAction: (name) => dispatch(overlayAction(name)),
});

class CartPopup extends PureComponent {
    static propTypes = {
        popup: PopupType,
    }

    containerProps() {
        const { popup } = this.props;
        
        return { popup };
    }

    containerFunctions() {
        return {
            handleOverLay: this.handleOverLay.bind(this),
        }
    }

    handleOverLay() {
        const { overlayAction } = this.props;

        overlayAction('');
    }

    renderComponent() {
        return (
            <CartPopupComponent
                { ...this.containerProps() }
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPopup);