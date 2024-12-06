<template>
    <div>
      <h2>Shopping Cart</h2>
      <div v-if="cartItems.length > 0">
        <div v-for="(item, index) in cartItems" :key="index">
          <p>{{ item.name }} - ${{ item.price }}</p>
          <button @click="removeFromCart(index)">Remove</button>
        </div>
      </div>
      <p v-else>Your cart is empty!</p>
    </div>
  </template>
  
  <script>
  import { useCartStore } from '../store/cart';
  
  export default {
    setup() {
      const cartStore = useCartStore();
      const removeFromCart = (index) => cartStore.removeFromCart(index);
  
      return { cartItems: cartStore.items, removeFromCart };
    },
  };
  </script>
  
  <style>
  button {
    margin-top: 0.5em;
  }
  </style>
  