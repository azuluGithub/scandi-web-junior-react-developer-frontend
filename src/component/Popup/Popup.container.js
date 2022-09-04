import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { 
    NOTIFICATION_SUCCESS_TYPE,
    NOTIFICATION_TIME_OUT_DURATION,
} from '../Notification/Notification.config';
import { hidePopupAction } from 'Store/Popup/Popup.action';
import { PopupType } from 'Type/Popup';
import { CartItemType } from 'Type/ProductList';
import PopupComponent from './Popup.component';
import CartDispatcher from 'Store/Cart/Cart.dispatcher';
import { showNotificationAction } from 'Store/Notification/Notification.action';

const mapStateToProps = (state) => ({
    items: state.cart.items,
    itemsCount: state.cart.itemsCount,
    itemsTotal: state.cart.itemsTotal,
});

const mapDispatchToProps = (dispatch) => ({
    hidePopupAction: () => dispatch(hidePopupAction()),
    cartDispatcher: (configs) => CartDispatcher.removeFromCart(dispatch, configs),
    showNotification: (notification) => dispatch(showNotificationAction(notification)),
});

class Popup extends PureComponent {
    static propTypes = {
        popup: PopupType.isRequired,
        hidePopupAction: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(CartItemType).isRequired,
        itemsCount: PropTypes.number.isRequired,
        itemsTotal: PropTypes.number.isRequired,
        cartDispatcher: PropTypes.func.isRequired,
        //showNotification: PropTypes.func.isRequired,
    }

    state = {
        itemName: ''
    }

    componentDidMount() {
        this.setItemName();
    }

    setItemName() {
        const { popup: { item: { product: { name }} } } = this.props;
       
        this.setState({ itemName: name });
    }

    containerProps() {
        const { popup } = this.props;
        
        return { popup };
    }

    containerFunctions() {
        return {
            handleCancel: this.handleCancel.bind(this),
            handleDelete: this.handleDelete.bind(this),
        }
    }

    handleCancel() {
        const { hidePopupAction } = this.props;

        hidePopupAction();
    }

    handleDelete() {
        const { 
            items,
            itemsCount,
            itemsTotal,
            cartDispatcher,
            popup: { item },
            showNotification,
            hidePopupAction,
        } = this.props;

        const { itemName } = this.state;
        const itemToRemove = item;
        const configs = { itemToRemove, items, itemsCount, itemsTotal };
        
        cartDispatcher(configs);

        const notification = {
            notificationsId: `${Date.now()}${Math.floor(Math.random(567, 56754))}`,
            type: NOTIFICATION_SUCCESS_TYPE,
            message: `${itemName.toUpperCase()} has been removed from cart`,
        }

        showNotification(notification);

        setTimeout(() => {
            this.setState({ itemName: '' });
        }, NOTIFICATION_TIME_OUT_DURATION);

        hidePopupAction();
    }

    renderComponent() {
        return (
            <PopupComponent
                { ...this.containerProps() }
                { ...this.containerFunctions() }
            />
        );
    }

    render() {
        return this.renderComponent();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);