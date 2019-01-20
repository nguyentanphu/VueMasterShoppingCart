import Vue from 'vue';
import Vuex from 'vuex';
import cart from './cart/index';
import product from './product';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cart,
        product
    }
});
