import { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CartItemComponent from './CartItem.component';
import CartDispatcher from 'Store/Cart/Cart.dispatcher';
import { CurrencyType, CartItemType } from 'Type/ProductList';

const mapStateToProps = (state) => ({
    selectedCurrency: state.currenciesReducer.selectedCurrency,
    items: state.cart.items,
    itemsCount: state.cart.itemsCount,
    itemsTotal: state.cart.itemsTotal,
});

const mapDispatchToProps = (dispatch) => ({
    updateDispatcher: (configs) => CartDispatcher.updateCart(dispatch, configs),
});

class CartItem extends PureComponent {
    static propTypes = {
        item: CartItemType.isRequired,
        items: PropTypes.arrayOf(CartItemType).isRequired,
        itemsCount: PropTypes.number.isRequired,
        itemsTotal: PropTypes.number.isRequired,
        selectedCurrency: CurrencyType.isRequired,
        updateDispatcher: PropTypes.func.isRequired,
        isSmall: PropTypes.bool,
        currencyIsUSD: PropTypes.bool,
        isSelectable: PropTypes.bool,
    }

    static defaultProps = {
        isSmall: false,
        currencyIsUSD: false,
        isSelectable: true,
    }

    sliderWrapperRef = createRef();

    containerProps() {
        const { 
            sliderWrapperRef 
        } = this;

        const { 
            item, 
            isSmall, 
            selectedCurrency, 
            currencyIsUSD,
            isSelectable,
        } = this.props;

        return { 
            item, 
            isSmall, 
            selectedCurrency, 
            currencyIsUSD, 
            sliderWrapperRef,
            isSelectable,
        };
    }

    updateCartHandler(type) {
        const { item, items, itemsCount, itemsTotal, updateDispatcher } = this.props;
        const configs = { type, itemInCart: item, items, itemsCount, itemsTotal };
        
        updateDispatcher(configs);
    }

    containerFunctions() {
        return {
            updateCartHandler: this.updateCartHandler.bind(this),
        };
    }

    renderComponent() {
        return (
            <CartItemComponent
                { ...this.containerProps() }
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CartItem);