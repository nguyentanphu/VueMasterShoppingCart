import axios from 'axios';
import * as types from './mutation-types';

const state = {
    cartItems: [],
    checkout: false
};

const mutations = {
    [types.UPDATE_CART_ITEMs](state, payload) {
        state.cartItems = payload;
    },
    [types.CHECKOUT_CART](state) {
        state.checkout = true;
    }
};

const actions = {
    getCartItems({commit}) {
        axios.get('/api/cart').then(response => {
            commit(types.UPDATE_CART_ITEMs, response.data);
        });
    },
    addCartItem({commit}, cartItem) {
        axios.post('/api/cart/', cartItem).then(response => {
            commit(types.UPDATE_CART_ITEMs, response.data);
        });
    },
    removeCartItem({commit}, cartItem) {
        axios.post('/api/cart/delete', cartItem).then(response => {
            commit(types.UPDATE_CART_ITEMs, response.data);
        });
    },
    removeAllCartItems({commit}) {
        axios.post('/api/cart/delete/all').then(response => {
            commit(types.UPDATE_CART_ITEMs, response.data);
        });
    },
    checkoutCart({commit}, cart) {
        axios.post('/api/cart/checkout').then(response => {
            commit(types.CHECKOUT_CART);
        });
    }
};

const getters = {
    cartItems: state => state.cartItems,
    cartTotal: state => state.cartItems.reduce((acc, item) => {
        return acc + (item.quantity * item.price);
    }, 0).toFixed(2),
    cartQuantity: state => state.cartItems
        .reduce((acc, item) => acc + item.quantity, 0)
};

const cartModule = {
    state,
    mutations,
    actions,
    getters
};

export default cartModule;