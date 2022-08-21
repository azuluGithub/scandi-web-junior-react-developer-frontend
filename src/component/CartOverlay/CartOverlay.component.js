import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CartItemType, CurrencyType } from 'Type/ProductList';
import CartItem from '../CartItem';

import './CartOverlay.style.scss';

class CartOverlayComponent extends PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(CartItemType).isRequired,
        itemsCount: PropTypes.number.isRequired,
        itemsTotalWithTax: PropTypes.number.isRequired,
        selectedCurrency: CurrencyType.isRequired,
        closeOverlay: PropTypes.func.isRequired,
    }

    renderNoItems() {
        return (
            <p className='CartOverlay-NoItems'>
               {'You have no items in your cart'}
            </p>
        );
    }

    renderCartTotal() {
        const { itemsTotalWithTax } = this.props;

        return (
            <div className='CartOverlay-CartTotal'>
                <span className="CartOverlay-CartTotalKey">
                    Total
                </span>
                <span className="CartOverlay-CartTotalValue">
                    {"$"} { itemsTotalWithTax.toFixed(2)}
                </span>
            </div>
        );
    }

    renderCartItem(item) {
        return (
            <CartItem
                key={item.item_id} 
                item={item}
                isSmall={true}
                isSelectable={false}
                currencyIsUSD={true}
            />
        );
    }

    renderCartList() {
        const { items } = this.props;

        return (
            <div className='CartOverlay-CartList'>
                { items.map((item) => this.renderCartItem(item)) }
            </div>
        );
    }

    renderCartHeader() {
        const { itemsCount } = this.props;

        return (
            <div className='CartOverlay-Heading'>
                <span className='CartOverlay-Title'>My Bag,</span>
                <span className='CartOverlay-TitleCount'>
                    {` ${itemsCount} items`}
                </span>
            </div>
        );
    }

    renderViewBagButton() {
        const { closeOverlay } = this.props;

        return (
            <Link
                to="/cart"
                onClick={() => closeOverlay()}
                className="Button CartOverlay-View"
            >
                view Bag
            </Link>
        );
    }

    renderCheckoutButton() {
        const { closeOverlay } = this.props;

        return (
            <Link 
                to="/checkout"
                onClick={() => closeOverlay()}
                className="Button CartOverlay-Checkout"
            >
                check out
            </Link>
        );
    }

    renderCartButtons() {
        return (
            <div className='CartOverlay-Buttons'>
                { this.renderViewBagButton() }
                { this.renderCheckoutButton() }
            </div>
        );
    }

    renderCartItems() {
        const { itemsCount } = this.props;

        if (itemsCount === 0) {
            return this.renderNoItems();
        }

        return (
            <div className='CartOverlay-Container'>
                { this.renderCartHeader() }
                { this.renderCartList() }
                { this.renderCartTotal() }
                { this.renderCartButtons() }
            </div>
        );
    }

    renderCartOverlay() {
        return (
            <div className='CartOverlay'>
               { this.renderCartItems() }
            </div>
        );
    }

    render() {
        return this.renderCartOverlay();
    }
}

export default CartOverlayComponent;