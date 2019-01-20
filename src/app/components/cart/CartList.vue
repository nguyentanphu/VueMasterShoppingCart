<template>
  <div id="cart">
    <div class="cart--header has-text-centered">
      <i class="fa fa-2x fa-shopping-cart"></i>
    </div>
    <p v-if="!cartItems.length" class="cart-empty-text has-text-centered">
      Add some items to the cart!
    </p>

    <ul v-if="cartItems.length > 0  ">
      <CartListItem v-for="item in cartItems" :key="item.id" :cartItem="item"/>
      <div class="cart-details">
        <p>Total Quantity: <span class="has-text-weight-bold">2</span></p>
        <p class="cart-remove-all--text" @click="removeAllCartItems">
          <i class="fa fa-trash"></i>Remove all
        </p>
      </div>
    </ul>
    <button @click="checkoutCart" :disabled="!cartItems.length" class="button is-primary">
      Checkout (<span class="has-text-weight-bold">${{cartTotal}}</span>)
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {mapActions} from 'vuex';
import CartListItem from './CartListItem';

export default {
  name: 'CartList',
  computed: {
    ...mapGetters(['cartItems', 'cartTotal', 'cartQuantity'])
  },
  created() {
    this.$store.dispatch('getCartItems');
  },
  components: {
    CartListItem
  },
  methods: {
    ...mapActions(['removeAllCartItems', 'checkoutCart  ']),
  }
}
</script>

<style scoped>
#cart {
  height: 100%;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cart-empty-text {
  padding: 10px 0;
}

.cart--header {
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 15px;
}

.cart-item {
  padding: 10px 0;
}

.cart-details {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.cart-remove-all--text {
  cursor: pointer;
}

.cart-remove-all--text .fa {
  padding-right: 5px;
}
</style>
