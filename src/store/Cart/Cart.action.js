export const ADD_TO_CART_TYPE = 'ADD_TO_CART_TYPE';
export const UPDATE_CART_TYPE = 'UPDATE_CART_TYPE';

export const addToCartAction = (data) => ({
    type: ADD_TO_CART_TYPE,
    payload: data,
});

export const updateCartAction = (data) => ({
    type: UPDATE_CART_TYPE,
    payload: data,
});
