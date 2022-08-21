import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {  NOTIFICATION_FAILURE_TYPE,  NOTIFICATION_SUCCESS_TYPE } from '../Notification/Notification.config';
import ProductActionsComponent from './ProductActions.component';
import CartDispatcher from 'Store/Cart/Cart.dispatcher';
import { showNotificationAction } from 'Store/Notification/Notification.action';
import { ProductType, CartItemType } from 'Type/ProductList';
import { NOTIFICATION_TIME_OUT_DURATION } from '../Notification/Notification.config';

const mapStateToProps = (state) => ({
    items: state.cart.items,
    itemsCount: state.cart.itemsCount,
    itemsTotal: state.cart.itemsTotal,
});

const mapDispatchToProps = (dispatch) => ({
    cartDispatcher: (configs) => CartDispatcher.addToCart(dispatch, configs),
    showNotification: (notification) => dispatch(showNotificationAction(notification)),
});

class ProductActions extends Component {
    static propTypes = {
        product: ProductType,
        items: PropTypes.arrayOf(CartItemType).isRequired,
        itemsCount: PropTypes.number.isRequired,
        itemsTotal: PropTypes.number.isRequired,
        cartDispatcher: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
    }

    static defaultProps = {
        product: null,
    }

    state = {
        selectedAttributes: null,
    }

    onHandleSelectedAttributes(attribute, name) {
        const { selectedAttributes } = this.state;

        if (!selectedAttributes) {
            const obj = {};
            obj[name] = attribute;
            return this.setState({ selectedAttributes: obj });
        }

        const attr = { ...selectedAttributes };
        attr[name] = attribute;
        this.setState({ selectedAttributes: attr });
    }

    containerProps() {
        const { product } = this.props;
        const { selectedAttributes } = this.state;

        return { product, selectedAttributes };
    }

    containerFunctions() {
        return {
            productHandler: this.productHandler.bind(this),
            onHandleSelectedAttributes: this.onHandleSelectedAttributes.bind(this),
        }
    }

    productHandler() {
        const { 
            items,
            itemsCount,
            itemsTotal,
            product,
            cartDispatcher,
            showNotification,
        } = this.props;

        const { selectedAttributes } = this.state;
        const { attributes, inStock } = product;

        let containerAttributes = selectedAttributes;

        if (!inStock) {
            const notification = {
                notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
                type: NOTIFICATION_FAILURE_TYPE,
                message: 'Sorry this product is not in stock!..',
            }
            showNotification(notification);
            return ;
        }

        if (attributes.length) {
            if (!containerAttributes) {
                const notification = {
                    notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
                    type: NOTIFICATION_FAILURE_TYPE,
                    message: 'Please select specifications e.g color, size, capacity etc..',
                }
                showNotification(notification);
                return ;
            }
            
            const allowedAttributes = {};

            for (let attribute of attributes) {
                const { name } = attribute;
                allowedAttributes[name] = null;
            }

            for (let attribute in allowedAttributes) {
                if (!containerAttributes[attribute]) {
                    const notification = {
                        notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
                        type: NOTIFICATION_FAILURE_TYPE,
                        message: `${attribute.toUpperCase()} is not selected`,
                    }
                    showNotification(notification);
                    return ;
                }
            }
        }
        
        const configs = { product, items, itemsCount, itemsTotal, containerAttributes };
        
        cartDispatcher(configs);

        const notification = {
            notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
            type: NOTIFICATION_SUCCESS_TYPE,
            message: `${product.name.toUpperCase()} has been added to cart`,
        }

        showNotification(notification);

        setTimeout(() => {
            this.setState({ selectedAttributes: null });
        }, NOTIFICATION_TIME_OUT_DURATION);
    }

    renderComponent() {
        return (
            <ProductActionsComponent
                { ...this.containerProps() }
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProductActions);