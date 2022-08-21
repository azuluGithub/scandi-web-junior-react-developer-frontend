import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { convertCurrency } from 'Util/Currency/Currency';
import { PRODUCT_ROUTE } from './ProductCard.config';
import { ProductType } from 'Type/ProductList';
import Cart from 'Util/Icons/Cart';

import './ProductCard.style.scss';

class ProductCardComponent extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        productHandler: PropTypes.func,
        selectedCurrency: PropTypes.object,
        setCurrentRoute: PropTypes.func,
    }

    static defaultProps = {
        selectedCurrency: {},
        productHandler: () => {},
        setCurrentRoute: () => {},
    }

    renderImage() {
        const { product: { gallery } } = this.props;

        return (
            <div className='ProductCard-ImageContainer'>
                <img
                    className='ProductCard-Image'
                    alt="product from scandi - project displayed" 
                    src={gallery[0]}
                />
            </div>
        );
    }

    renderContent() {
        const {
            product: { prices, brand, name },
            selectedCurrency: { label, symbol }
        } = this.props;

        return (
            <div className='ProductCard-Content'>
                <p className="ProductCard-ContentTitle">
                    {brand} {name}
                </p>
                <p className="ProductCard-ContentPrice">
                    {symbol}  { convertCurrency(prices, label) }
                </p>
            </div>
        );
    }

    renderProductOutOfStock() {
        return (
            <div className="ProductCard-OverLay">
                <p className="ProductCard-OverLayText">
                    OUT OF STOCK
                </p>
            </div>
        );
    }

    renderProductCart() {
        const { productHandler } = this.props;
        
        return (
            <div 
                className='ProductCard-CartContainer'
                onClick={productHandler}
            >
                <Cart height={18} color={'#fff'}/>
            </div>
        );
    }

    renderProductCardContent() {
        const {  product : { id }, setCurrentRoute} = this.props;

        const currentRoute = {
            name: id,
            path: PRODUCT_ROUTE,
        };

        return (
            <Link 
                className="Link ProductCard" 
                to={`/product/${id}`}
                onClick={() => setCurrentRoute(currentRoute)}
            >
                <div className='ProductCard-Container'>
                    { this.renderImage() }
                    { this.renderContent() }
                </div>
            </Link>
        )
    }

    renderProductCard() {
        const {  product : { inStock } } = this.props;

        return (
            <div className='ProductCard-Wrapper'>
                { this.renderProductCardContent() }
                { this.renderProductCart() }
                { !inStock && this.renderProductOutOfStock() }
            </div>
        );
    }

    render() {
        return this.renderProductCard();
    }
}

export default ProductCardComponent;