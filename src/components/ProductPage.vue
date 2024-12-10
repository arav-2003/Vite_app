<template>
  <div>
    <h2>Products</h2>
    <div class="products" v-if="products.length">
      <div
        class="product-card"
        v-for="product in products"
        :key="product.id"
      >
        <img :src="product.image" :alt="product.title" />
        <h3>{{ product.title }}</h3>
        <!-- Calculate total price based on units -->
        <p>Total: ${{ (product.price * (productUnits[product.id] || 1)).toFixed(2) }}</p>

        <!-- Units Input and Add to Cart Button -->
        <div class="actions">
          <input
            type="number"
            min="1"
            v-model.number="productUnits[product.id]"
            placeholder="Units"
          />
        </div>
        <div>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>
    <p v-else>Loading products...</p>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useCartStore } from '../store/cart';
import { fetchProducts } from '../services/productServices';

export default {
  setup() {
    const products = ref([]);
    const productUnits = ref({});
    const cartStore = useCartStore();

    const addToCart = (product) => {
      const units = productUnits.value[product.id] || 1; // Default to 1 if no input
      const productWithUnits = { ...product, units };
      cartStore.addToCart(productWithUnits);

      // Show alert message
      alert(`Added ${units} unit(s) of "${product.title}" to the cart.`);
    };

    onMounted(async () => {
      try {
        products.value = await fetchProducts();

        // Initialize units for each product
        products.value.forEach((product) => {
          productUnits.value[product.id] = 1; // Default to 1 unit
        });
      } catch (error) {
        console.error('Failed to load products', error);
      }
    });

    return { products, productUnits, addToCart };
  },
};
</script>

<style>
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-card {
  display: flex;
  flex-direction: column; /* Ensures vertical stacking */
  justify-content: space-between; /* Space between content and actions */
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  height: 100%; /* Ensures equal height for all cards */
}

.product-card img {
  max-width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
}

.product-card h3 {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.product-card p {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
}

.product-card button {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #00b327f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-card button:hover {
  background-color: darkgreen;
}

.actions input {
  width: 50px;
  margin-top: 0%;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

h2 {
  margin: 1rem;
  text-align: center;
}
</style>
