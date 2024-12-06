<template>
  <div class="product-card">
    <img :src="product.image" alt="Product Image" />
    <h3>{{ product.title }}</h3>
    <p>${{ product.price }}</p>
    <button class="button" @click="$emit('add-to-cart', product)">
      Add to Cart
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style scoped>
/* Scoped styles can go here if needed */
</style>
