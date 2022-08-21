import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductCardComponent from './ProductCard.component';
import { NOTIFICATION_FAILURE_TYPE } from '../Notification/Notification.config';
import { showNotificationAction } from 'Store/Notification/Notification.action';
import { ProductType } from 'Type/ProductList';
import { routeAction } from 'Store/Route/Route.action';

const mapStateToProps = (state) => ({
    selectedCurrency: state.currenciesReducer.selectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
    routeAction: (route) => dispatch(routeAction(route)),
    showNotification: (notification) => dispatch(showNotificationAction(notification)),
});

class ProductCard extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        selectedCurrency: PropTypes.object,
        showNotification: PropTypes.func,
        routeAction: PropTypes.func,
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

    productNotInStock() {
        const { showNotification } = this.props;

        const notification = {
            notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
            type: NOTIFICATION_FAILURE_TYPE,
            message: 'Sorry this product is not in stock!..',
        }
        showNotification(notification);
    }

    viewProduct() {
        const { showNotification } = this.props;

        const notification = {
            notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
            type: NOTIFICATION_FAILURE_TYPE,
            message: 'Please view product to select attributes e.g size and color',
        }
        showNotification(notification);
    }

    productHandler() {
        const { product: { inStock } } = this.props;

        if (!inStock) {
            return this.productNotInStock();
        }

        this.viewProduct();
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