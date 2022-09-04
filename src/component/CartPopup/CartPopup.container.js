import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { PopupType } from 'Type/Popup';
import CartPopupComponent from './CartPopup.component';

const mapStateToProps = (state) => ({
    popup: state.popupReducer.popup,
});

const mapDispatchToProps = (dispatch) => ({});

class CartPopup extends PureComponent {
    static propTypes = {
        popup: PopupType,
    }

    containerProps() {
        const { popup } = this.props;
        
        return { popup };
    }

    

    renderComponent() {
        return (
            <CartPopupComponent
                { ...this.containerProps() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPopup);