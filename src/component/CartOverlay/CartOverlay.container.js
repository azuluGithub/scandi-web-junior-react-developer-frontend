import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CartOverlayComponent from './CartOverlay.component';
import { overlayAction } from 'Store/Overlay/Overlay.action';
import { CartItemType, CurrencyType } from 'Type/ProductList';

const mapStateToProps = (state) => ({
    selectedCurrency: state.currenciesReducer.selectedCurrency,
    items: state.cart.items,
    itemsCount: state.cart.itemsCount,
    itemsTotalWithTax: state.cart.itemsTotalWithTax,
});

const mapDispatchToProps = (dispatch) => ({
    overlayAction: (name) => dispatch(overlayAction(name)),
});

class CartOverlay extends PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(CartItemType).isRequired,
        itemsCount: PropTypes.number.isRequired,
        itemsTotalWithTax: PropTypes.number.isRequired,
        selectedCurrency: CurrencyType.isRequired,
        overlayAction: PropTypes.func.isRequired,
    }

    containerProps() {
        const { items, itemsCount, itemsTotalWithTax, selectedCurrency } = this.props;

        return { items, itemsCount, itemsTotalWithTax, selectedCurrency };
    }

    containerFunctions() {
        return {
            closeOverlay: this.closeOverlay.bind(this),
        }
    }

    closeOverlay() {
        const { overlayAction } = this.props;
        
        overlayAction('');
    }

    renderComponent() {
        return (
            <CartOverlayComponent
                { ...this.containerProps() }
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CartOverlay);