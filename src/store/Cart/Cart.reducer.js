import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';
import { ADD_TO_CART_TYPE, UPDATE_CART_TYPE } from './Cart.action';

const emptyCart = () => ({
    itemsCount: 0,
    itemsTotal: 0,
    itemsTotalWithTax: 0,
    items: [],
});

const getCart = () => {
    const cart = BrowserDatabase.getItem('cart');
    return cart ? cart : emptyCart();
}

const initialCartState = () => ({
    ...getCart(),
    tax: 42,
    taxPercentage: '21%',
});

const createNewCart = (cart, payload) => {
    const { tax } = cart;
    const { itemsTotal } = payload;

    return {
        ...cart,
        ...payload,
        itemsTotalWithTax: tax + itemsTotal,
    };
};

const setCart = (cart) => {
    BrowserDatabase.setItem('cart', cart);
}

export const cartReducer = (state = initialCartState(), action = {}) => {
    const { type, payload } = action;
  
    switch (type) {
        case UPDATE_CART_TYPE:
            const updatedCart = createNewCart(state, payload);
            setCart(updatedCart);

            return { 
                ...updatedCart,
            };
    
        case ADD_TO_CART_TYPE:
            const newCart = createNewCart(state, payload);
            setCart(newCart);
            
            return { 
                ...newCart,
            };

      default:
        return state;
    }
}