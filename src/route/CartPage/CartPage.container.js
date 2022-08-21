import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CartPageComponent from './CartPage.component';
import { CART_PAGE, CART_PAGE_ROUTE } from './CartPage.config';
import { routeAction } from 'Store/Route/Route.action';
import { CartItemType } from 'Type/ProductList';

const mapStateToProps = (state) => ({
    selectedCurrency: state.currenciesReducer.selectedCurrency,
    items: state.cart.items,
    itemsCount: state.cart.itemsCount,
    tax: state.cart.tax,
    taxPercentage: state.cart.taxPercentage,
    itemsTotalWithTax: state.cart.itemsTotalWithTax,
});

const mapDispatchToProps = (dispatch) => ({
    routeAction: (route) => dispatch(routeAction(route)),
})

class CartPage extends PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(CartItemType),
        itemsCount: PropTypes.number,
        itemsTotalWithTax: PropTypes.number,
        tax: PropTypes.number,
        selectedCurrency: PropTypes.object,
        routeAction: PropTypes.func.isRequired,
        taxPercentage: PropTypes.string,
    }

    static defaultProps = {
        items: [],
        itemsCount: 0,
        itemsTotal: 0,
        selectedCurrency: null,
        itemsTotalWithTax: 0,
        tax: 0,
        taxPercentage: '',
    }

    containerProps() {
        const {
            tax,
            items, 
            itemsCount, 
            itemsTotalWithTax, 
            selectedCurrency,
            taxPercentage,
        } = this.props;

        return {
            tax,
            items,
            itemsCount,
            itemsTotalWithTax,
            selectedCurrency,
            taxPercentage,
        }
    }

    componentDidMount() {
        this.setCurrentRoute();
    }

    setCurrentRoute() {
        const { routeAction } = this.props;
        const currentRoute = {
                name: CART_PAGE,
                path: CART_PAGE_ROUTE,
            };
        routeAction(currentRoute);
    }

    renderComponent() {
        return (
            <CartPageComponent
                { ...this.containerProps() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CartPage);