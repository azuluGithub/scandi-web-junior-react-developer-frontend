import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductCardComponent from './ProductCard.component';
import { NOTIFICATION_FAILURE_TYPE,  NOTIFICATION_SUCCESS_TYPE } from '../Notification/Notification.config';
import { showNotificationAction } from 'Store/Notification/Notification.action';
import { ProductType, CartItemType } from 'Type/ProductList';
import { routeAction } from 'Store/Route/Route.action';
import CartDispatcher from 'Store/Cart/Cart.dispatcher';

const mapStateToProps = (state) => ({
    items: state.cart.items,
    itemsCount: state.cart.itemsCount,
    itemsTotal: state.cart.itemsTotal,
    selectedCurrency: state.currenciesReducer.selectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
    cartDispatcher: (configs) => CartDispatcher.addToCart(dispatch, configs),
    routeAction: (route) => dispatch(routeAction(route)),
    showNotification: (notification) => dispatch(showNotificationAction(notification)),
});

class ProductCard extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        selectedCurrency: PropTypes.object,
        showNotification: PropTypes.func,
        routeAction: PropTypes.func,
        items: PropTypes.arrayOf(CartItemType).isRequired,
        itemsCount: PropTypes.number.isRequired,
        itemsTotal: PropTypes.number.isRequired,
        cartDispatcher: PropTypes.func.isRequired,
    }

    static defaultProps = {
        selectedCurrency: {},
        routeAction: () => {},
        showNotification: () => {},
    }

    setCurrentRoute(route) {
        const { routeAction } = this.props;

        routeAction(route);
    }

    containerProps() {
        const { product, selectedCurrency } = this.props;
        
        return { product, selectedCurrency };
    }

    containerFunctions() {
        return {
            productHandler: this.productHandler.bind(this),
            setCurrentRoute: this.setCurrentRoute.bind(this),
        }
    }

    state = {
        containerAttributes: null,
    }

    setContainerAttributes() {
        const { product: { attributes } } = this.props;

        if (!attributes.length) {
            return ;
        }
        
        const newAttributes = {};
        
        attributes.forEach((attribute) => {
            const { name, items } = attribute;
            const { value } = items[0];

            newAttributes[name] = value;
        });

        this.setState({ containerAttributes: newAttributes });
    }

    componentDidMount() {
        this.setContainerAttributes();
    }

    productNotInStock() {
        const { showNotification } = this.props;

        const notification = {
            notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
            type: NOTIFICATION_FAILURE_TYPE,
            message: 'Sorry this product is not in stock!..',
        }
        showNotification(notification);
    }

    handleProduct() {
        const { 
            items,
            itemsCount,
            itemsTotal,
            product,
            cartDispatcher,
            showNotification,
        } = this.props;

        const { containerAttributes } = this.state;

        const configs = { product, items, itemsCount, itemsTotal, containerAttributes };
        
        cartDispatcher(configs);

        const notification = {
            notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
            type: NOTIFICATION_SUCCESS_TYPE,
            message: `${product.name.toUpperCase()} has been added to cart`,
        }

        showNotification(notification);
    }

    productHandler() {
        const { product: { inStock } } = this.props;

        if (!inStock) {
            return this.productNotInStock();
        }

        this.handleProduct();
    }

    renderComponent() {
        return (
            <ProductCardComponent
                { ...this.containerProps() }
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductCard);