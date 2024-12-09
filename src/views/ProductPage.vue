<template>
    <div>
      <h2>Products</h2>
      <div class="products" v-if="products.length">
        <ProductCard 
          v-for="product in products" :key="product.id" :product="product" @add-to-cart="addToCart">
        </ProductCard>
      </div>
      <p v-else>Loading products...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import ProductCard from '../components/ProductCard.vue';
  import { useCartStore } from '../store/cart';
  import { fetchProducts } from '../services/productServices';
  
  export default {
    components: { ProductCard },
    setup() {
      const products = ref([]);
      const cartStore = useCartStore();
      const addToCart = (product) => cartStore.addToCart(product);
  
      onMounted(async () => {
        try {
          products.value = await fetchProducts();
        } catch (error) {
          console.error('Failed to load products');
        }
      });
  
      return { products, addToCart };
    },
  };
  </script>
  
  <style>
  .products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  h2
  {
    margin: 1rem;
    text-align: center;
  
  }
  </style>
  