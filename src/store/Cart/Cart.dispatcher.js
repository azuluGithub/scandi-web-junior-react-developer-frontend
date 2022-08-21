import { INCREASE_CART_TYPE } from 'Component/CartItem/CartItem.config';
import { addToCartAction, updateCartAction } from './Cart.action';
import { convertCurrency } from 'Util/Currency/Currency';

class CartDispatcher {

    addToCart(dispatch, configs) {
        const { containerAttributes } = configs;

        let itemInCart = this._findItemInCart(configs);
        
        if (!itemInCart) {
            const newCart = this._createNewCart(configs);
            return dispatch(addToCartAction(newCart));
        }

        if (itemInCart && !containerAttributes) {
            const updatedCart = this._updateExistingCart(itemInCart, configs);
            return dispatch(updateCartAction(updatedCart));
        }

        if (itemInCart) {
            let isMatch = this._isMatchingAttributes(configs);

            if (isMatch) 
            {
                const updatedCart = this._updateExistingCart(isMatch, configs);
                return dispatch(updateCartAction(updatedCart));
            } 
            else 
            {
                const newCart = this._createNewCart(configs);
                return dispatch(addToCartAction(newCart));
            }
        }
    }

    _setSelectedAttributes(containerAttributes) {
        const attributes = { selectedAttributes: containerAttributes };
        return containerAttributes && attributes;
    }

    _createNewCart(configs) {
        const { product, items, itemsTotal, itemsCount, containerAttributes,} = configs;

        const newItem = {
            item_id: `${product.id}${Date.now()}${Math.floor(Math.random(0, 50000))}`,
            item_qty: 1,
            product,
            ...this._setSelectedAttributes(containerAttributes),
        }

        const newCart = {
            itemsCount: itemsCount + 1,
            itemsTotal: itemsTotal + convertCurrency(product.prices),
            items: [...items, newItem ],
        }

        return newCart;
    }

    _updateExistingCart(itemInCart, configs) {
        const { items, itemsTotal, itemsCount } = configs;

        const updateItems = items.map((item) => {
            if (item.item_id === itemInCart.item_id) {
                item = { ...item, item_qty: item.item_qty + 1 };
            }
            return item;
        });

        const { product: { prices } } = itemInCart;

        const updatedCart = {
            itemsCount: itemsCount + 1,
            itemsTotal: itemsTotal + convertCurrency(prices),
            items: updateItems,
        }

        return updatedCart;
    }

    _lenOfObj(obj) {
        return Object.keys(obj).length;
    }

    _findItemInCart({ product, items }) {
        for (let item of items) {
            if (item.product.id === product.id) {
                return item;
            }
        }
        return null;
    }

    _isMatchingAttributes(configs) {
        const { containerAttributes, items } = configs;

        for (let item of items) {
            const { selectedAttributes } = item;

            if (this._lenOfObj(selectedAttributes) === this._lenOfObj(containerAttributes)) {
                let count = 0;
                for (let key in containerAttributes) {
                    if (containerAttributes[key] === selectedAttributes[key]) {
                        count++;
                    }
                    if (count === this._lenOfObj(containerAttributes)) {
                        return item;
                    }
                }
            }
        }
        return null;
    }

    updateCart(dispatch, configs) {
        const { type } = configs;

        if (type === INCREASE_CART_TYPE) {
            this._increaseQuantity(dispatch, configs);
        } else {
            this._decreaseQuantity(dispatch, configs);
        }
    }

    _increaseQuantity(dispatch, configs) {
        const { itemInCart, items, itemsCount, itemsTotal } = configs;

        const updatedItems = items.map((item) => {
            if (item.item_id === itemInCart.item_id) {
                item = { ...item, item_qty: item.item_qty + 1 };
            }
            return item;
        });

        const { product: { prices } } = itemInCart;

        const updatedCart = {
            itemsCount: itemsCount + 1,
            itemsTotal: itemsTotal + convertCurrency(prices),
            items: updatedItems,
        }

        dispatch(updateCartAction(updatedCart));
    }

    _decreaseQuantity(dispatch, configs) {
        const { itemInCart, items, itemsCount, itemsTotal } = configs;

        if (itemInCart.item_qty === 1) {
            return ;
        }

        const updatedItems = items.map((item) => {
            if (item.item_id === itemInCart.item_id) {
                item = { ...item, item_qty: item.item_qty - 1 };
            }
            return item;
        });

        const { product: { prices } } = itemInCart;

        const updatedCart = {
            itemsCount: itemsCount - 1,
            itemsTotal: itemsTotal - convertCurrency(prices),
            items: updatedItems,
        }

        dispatch(updateCartAction(updatedCart));
    }
}

export default new CartDispatcher();