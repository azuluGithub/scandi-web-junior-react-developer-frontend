import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PRODUCT_QUERY } from 'Util/Request/Query.config';
import ProductDisplayPageComponent from './ProductDisplayPage.component';
import ProductDispatcher from 'Store/Product/Product.dispatcher';
import { removeProductAction } from 'Store/Product/Product.action';
import { routeAction } from 'Store/Route/Route.action';
import { ProductType } from 'Type/ProductList';
import { PRODUCT_ROUTE } from 'Component/ProductCard/ProductCard.config';

const mapStateToProps = (state, ownProps) => ({
    productId: ownProps.match.params.id,
    product: state.productsReducer.product,
    selectedCurrency: state.currenciesReducer.selectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
    requestProduct: (args) => ProductDispatcher.requestData(dispatch, args),
    removeProduct: () => dispatch(removeProductAction()),
    routeAction: (route) => dispatch(routeAction(route)),
});

class ProductDisplayPage extends PureComponent {
    static propTypes = {
        selectedCurrency: PropTypes.object,
        productId: PropTypes.string.isRequired,
        requestProduct: PropTypes.func.isRequired,
        product: ProductType,
        routeAction: PropTypes.func.isRequired,
        removeProduct: PropTypes.func,
    }

    static defaultProps = {
        selectedCurrency: null,
        productId: '',
        product: null,
        removeProduct: () => {},
    }

    state = {
        product: null,
    }

    setProduct() {
        const { product } = this.props;
        this.setState({ product });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getProduct();
        this.setCurrentPath();
        this.setProduct();
    }

    componentDidUpdate(prevProps) {
        const { product } = this.props;

        if (prevProps.product !== product) {
            this.setProduct();
        }
    }

    componentWillUnmount() {
        const { removeProduct } = this.props;
        removeProduct();
    }

    getProduct() {
        const { requestProduct, productId } = this.props;
        
        const args = { 
            identifier: productId, 
            type: PRODUCT_QUERY 
        }

        requestProduct(args);
    }

    setCurrentPath() {
        const { routeAction, productId } = this.props;

        const currentRoute = {
            name: productId,
            path: PRODUCT_ROUTE,
        };

        routeAction(currentRoute);
    }

    containerProps() {
        const { product } = this.state;
        return { product };
    }

    renderComponent() {
        return (
            <ProductDisplayPageComponent 
                { ...this.containerProps() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductDisplayPage);