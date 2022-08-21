import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HtmlParser from 'html-react-parser'

import Attributes from '../Attributes';
import { ProductType } from 'Type/ProductList';
import ProductContent from '../ProductContent';

import './ProductActions.style.scss';

class ProductActionsComponent extends PureComponent {
    static propTypes = {
        product: ProductType,
        selectedAttributes: PropTypes.object,
        onHandleSelectedAttributes: PropTypes.func.isRequired,
        productHandler: PropTypes.func.isRequired,
    }

    static defaultProps = {
        product: null,
        selectedAttributes: null,
    }

    renderProductContent() {
        const { product } = this.props;

        return (
            <ProductContent 
                product={ product }
            />
        )
    }

    renderButton() {
        const { productHandler } = this.props;

        return (
            <button 
                className='ProductActions-Button Button'
                onClick={productHandler}
            >
                {'add to cart'}
            </button>
        )
    }

    renderDescription() {
        const { product: { description } } = this.props;

        return (
            <div className='ProductActions-Description'>
                { HtmlParser(description) }
            </div>
        )
    }

    renderAttributes() {
        const { product, selectedAttributes, onHandleSelectedAttributes } = this.props;
        const attributesProps = { product, selectedAttributes, onHandleSelectedAttributes };

        return <Attributes { ...attributesProps } />;
    }

    renderProductActions() {
        return (
            <div className='ProductActions'>
                { this.renderProductContent() }
                <div className='ProductActions-Attributes'>
                    { this.renderAttributes() }
                </div>
                { this.renderButton() }
                { this.renderDescription() }
            </div>
        );
    }

    renderComponent() {
        const { product } = this.props;

        if (!product) {
            return ;
        }

        return this.renderProductActions();
    }

    render() {
        return this.renderComponent();
    }
}

export default ProductActionsComponent;