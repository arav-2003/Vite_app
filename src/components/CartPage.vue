<template>
  <div>
    <h2>Your Cart</h2>
    <div v-if="cartItems.length" class="cart">
      <div class="cart-card" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" :alt="item.title" />
        <div class="cart-details">
          <h3>{{ item.title }}</h3>
          <p><strong>Price:</strong> ${{ item.price }}</p>
          <p><strong>Units:</strong> {{ item.units }}</p>
        </div>
        <button @click="removeFromCart(item.id)">Remove</button>
      </div>
      <div class="checkout">
        <p><strong>Total:</strong> ${{ cartTotal.toFixed(2) }}</p>
        <button @click="proceedToCheckout">Proceed to Checkout</button>
      </div>
    </div>
    <p v-else>Your cart is empty!</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCartStore } from '../store/cart';

export default {
  setup() {
    const cartStore = useCartStore();

    const cartItems = computed(() => cartStore.cart);

    // Calculate total price
    const cartTotal = computed(() => {
      return cartStore.cart.reduce((total, item) => total + item.price * item.units, 0);
    });

    const removeFromCart = (id) => {
      cartStore.removeFromCart(id);
      alert('Item removed from cart!');
    };

    const proceedToCheckout = () => {
      alert(`Thank you for your purchase! Your total is $${cartTotal.value.toFixed(2)}.`);
      // Clear cart after checkout
      cartStore.clearCart();
    };

    return { cartItems, cartTotal, removeFromCart, proceedToCheckout };
  },
};
</script>

<style scoped>
.cart {
  display: grid;
  text-align: center;
  gap: 1rem;
}

.cart-card {
  display: flex;
  align-items: flex-start;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9f9f9;
}

.cart-card img {
  width: 100px;
  height: auto;
  border-radius: 4px;
  margin-right: 1rem;
}

.cart-details {
  flex: 1;
}

.cart-details h3 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.cart-details p {
  margin: 0.5rem 0;
}

button 
{
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #e63946;
}

h2 {
  text-align: center;
  margin: 1rem 0;
}

/* Checkout Section */
.checkout {
  text-align: center;
  margin-top: 1rem;
}

.checkout p {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.checkout button {
  background-color: #00b327f3;
  color: white;
  padding: 0.5rem 1rem;
  align-self: center;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.checkout button:hover {
  background-color: darkgreen;
}
</style>
