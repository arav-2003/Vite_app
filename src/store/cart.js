import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.unit += product.unit;
      } else {
        this.cart.push({ ...product });
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },
    clearCart()
    {
      this.cart="";
    }
  },
});
