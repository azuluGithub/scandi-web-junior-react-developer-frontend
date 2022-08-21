import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ProductType } from 'Type/ProductList';
import { convertCurrency } from 'Util/Currency/Currency';

import './ProductContent.style.scss';

class ProductContentComponent extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        isSmall: PropTypes.bool,
        currencyIsUSD: PropTypes.bool,
        selectedCurrency: PropTypes.object,
    }

    static defaultProps = {
        isSmall: false,
        currencyIsUSD: false,
        selectedCurrency: {},
    }

    renderBrand() {
        const { product: { brand }, isSmall } = this.props;
        const brandClass = isSmall && 'ProductContent-Brand_isSmall';

        return (
            <p className={`ProductContent-Brand ${brandClass}`}>
                { brand }
            </p>
        )
    }

    renderName() {
        const { product: { name }, isSmall } = this.props;
        const nameClass = isSmall && 'ProductContent-Name_isSmall';

        return (
            <p className={`ProductContent-Name ${nameClass}`}>
                { name }
            </p>
        )
    }

    getPrice() {
        const { 
            currencyIsUSD,
            product: { prices },
            selectedCurrency: { label }
        } = this.props;

        return currencyIsUSD 
            ? convertCurrency(prices)
            : convertCurrency(prices, label);
    }

    getLabel() {
        const { 
            currencyIsUSD, 
            selectedCurrency: { symbol },
        } = this.props;

        return currencyIsUSD ? "$" : symbol;
    }

    renderPrice() {
        const { isSmall } = this.props;
        
        const priceClass = isSmall && 'ProductContent-Price_isSmall';

        return (
            <div className={`ProductContent-Price ${priceClass}`}>
                <span className='ProductContent-PriceSymbol'>
                    { this.getLabel() }
                </span>
                <span>{ this.getPrice() }</span>
            </div>
        );
    }

    renderProductContent() {
        return (
            <div className='ProductContent'>
                { this.renderBrand() }
                { this.renderName() }
                { this.renderPrice() }
            </div>
        );
    }

    render() {
        return this.renderProductContent();
    }
}

export default ProductContentComponent;