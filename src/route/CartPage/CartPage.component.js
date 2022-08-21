import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CartItem from 'Component/CartItem';
import ContainerWrapper from 'Component/ContainerWrapper';
import { CartItemType } from 'Type/ProductList';

import './CartPage.style.scss';

class CartPageComponent extends PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(CartItemType),
        itemsCount: PropTypes.number,
        itemsTotalWithTax: PropTypes.number,
        selectedCurrency: PropTypes.object,
        tax: PropTypes.number,
        taxPercentage: PropTypes.string,
    }

    static defaultProps = {
        items: [],
        itemsCount: 0,
        selectedCurrency: null,
        itemsTotalWithTax: 0,
        tax: 0,
        taxPercentage: '',
    }

    renderHeading() {
        return (
            <div className='CartPage-Heading'>
                {'CART'}
            </div>
        );
    }

    renderCartItem(item) {
        return (
            <CartItem 
                key={item.item_id} 
                item={item}
                currencyIsUSD={true}
                isSelectable={false}
            />
        );
    }

    renderCartList() {
        const { items } = this.props;

        return (
            <div className='CartPage-List'>
                { items.map((item) => this.renderCartItem(item)) }
            </div>
        );
    }
  
    renderOrderButton() {
        return (
            <Link to="/checkout" className="Link">
                <button className="CartPage-Button Button">{'order'}</button>
            </Link>
        )
    }

    renderSummaryTax() {
        const { tax, taxPercentage } = this.props;

        return (
            <tr className="CartPage-SummaryAmount">
                <td className="CartPage-AmountKey">{`tax ${taxPercentage}:`}</td>
                <td className="CartPage-AmountValue">{'$'} {tax.toFixed(2)}</td>
            </tr>
        );
    }

    renderSummaryQuantity() {
        const { itemsCount } = this.props;

        return (
            <tr className="CartPage-SummaryAmount">
                <td className="CartPage-AmountKey">{'quantity: '}</td>
                <td className="CartPage-AmountValue">{itemsCount}</td>
            </tr>
        );
    }

    renderSummaryTotal() {
        const { itemsTotalWithTax } = this.props;

        return (
            <tr className="CartPage-SummaryTotal">
                <td className="CartPage-TotalKey">{'total: '}</td>
                <td className="CartPage-TotalValue">{'$'} {itemsTotalWithTax.toFixed(2)}</td>
            </tr>
        );
    }

    renderSummary() {
        return  (
            <div className='CartPage-Summary'>
                <table className='CartPage-SummaryTable'>
                    <tbody>
                        { this.renderSummaryTax() }
                        { this.renderSummaryQuantity() }
                        { this.renderSummaryTotal() }
                    </tbody>
                </table>
            </div>
        );
    }

    renderComponents() {
        return (
            <>
                { this.renderHeading() }
                { this.renderCartList() }
                { this.renderSummary() }
                { this.renderOrderButton() }
            </>
        );
    }

    renderNoProducts() {
        return (
            <div className='CartPage-NoProducts'>
                <div className='CartPage-NoProductsLabel'>
                    { 'No Products In Cart' }
                </div>
            </div>
        );
    }

    renderCheckForProducts() {
        const { itemsCount } = this.props;

        return itemsCount !== 0
                ? this.renderComponents()
                : this.renderNoProducts();
    }

    renderCartPage() {
        return (
            <main className='CartPage'>
                <ContainerWrapper>
                    { this.renderCheckForProducts() }
                </ContainerWrapper>
            </main>
        );
    }

    render() {
        return this.renderCartPage();
    }
}

export default CartPageComponent;