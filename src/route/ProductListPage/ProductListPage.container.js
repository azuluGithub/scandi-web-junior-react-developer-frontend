import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { CATEGORY_QUERY } from 'Util/Request/Query.config';
import ProductListPageComponent from './ProductListPage.component';
import ProductDispatcher from 'Store/Product/Product.dispatcher';
import { routeAction } from 'Store/Route/Route.action';
import { ProductType } from 'Type/ProductList';
import { CATEGORIES_ROUTE } from 'Component/MenuItem/MenuItem.config';
import { overlayAction } from 'Store/Overlay/Overlay.action';

const mapStateToProps = (state, ownProps) => ({
    category: ownProps.match.params.name,
    products: state.productsReducer.products,
    selectedCurrency: state.currenciesReducer.selectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
    requestProducts: (args) => ProductDispatcher.requestData(dispatch, args),
    routeAction: (route) => dispatch(routeAction(route)),
    overlayAction: (name) => dispatch(overlayAction(name)),
});

class ProductListPage extends PureComponent {
    static propTypes = {
        selectedCurrency: PropTypes.object,
        category: PropTypes.string,
        requestProducts: PropTypes.func.isRequired,
        products: PropTypes.arrayOf(ProductType),
        routeAction: PropTypes.func.isRequired,
    }

    static defaultProps = {
        selectedCurrency: null,
        category: '',
        products: [],
    }

    componentDidMount() {
        this.getProducts();
        this.setCurrentRoute();
        this.handleOverLay();
    }

    componentDidUpdate(prevProps) {
        const { category } = this.props;

        if (prevProps.category !== category) {
            this.getProducts();
            this.handleOverLay();
        }
    }

    getProducts() {
        const { category, requestProducts } = this.props;

        const args = {
            identifier: category,
            type: CATEGORY_QUERY,
        }

        requestProducts(args);
    }

    setCurrentRoute() {
        const { routeAction, category } = this.props;

        const currentRoute = {
            name: category,
            path: CATEGORIES_ROUTE,
        };

        routeAction(currentRoute);
    }

    handleOverLay() {
        const { overlayAction } = this.props;

        overlayAction('');
    }

    containerProps() {
        const { products, category } = this.props;
        return { products, category };
    }

    renderComponent() {
        return (
            <ProductListPageComponent 
                { ...this.containerProps() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductListPage);