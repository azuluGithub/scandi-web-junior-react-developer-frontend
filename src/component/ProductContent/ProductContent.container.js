import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ProductType } from 'Type/ProductList';
import ProductContentComponent from './ProductContent.component';

const mapStateToProps = (state) => ({
    selectedCurrency: state.currenciesReducer.selectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({});

class ProductContent extends PureComponent {
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

    containerProps() {
        const { selectedCurrency, product, isSmall, currencyIsUSD } = this.props;
        
        return { selectedCurrency, product, isSmall, currencyIsUSD };
    }

    renderComponent() {
        return (
            <ProductContentComponent
                { ...this.containerProps() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContent);