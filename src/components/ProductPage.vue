<template>
  <div class="container">
    <!-- Filter Sidebar -->
    <aside class="filter-sidebar">
      <h3>Filters</h3>

      <!-- Category Filter -->
      <div class="filter-category">
        <label for="category">Category:</label>
        <select v-model="selectedCategory" id="category">
          <option value="">All</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Price Range Filter -->
      <div class="filter-price">
        <label>Price Range:</label>
        <div>
          <input
            type="number"
            v-model.number="minPrice"
            placeholder="Min"
            class="price-input"
          />
          -
          <input
            type="number"
            v-model.number="maxPrice"
            placeholder="Max"
            class="price-input"
          />
        </div>
      </div>
    </aside>

    <!-- Product List -->
    <main class="product-list">
      <h2>Products</h2>
      <div class="products" v-if="filteredProducts.length">
        <div
          class="product-card"
          v-for="product in filteredProducts"
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
      <p v-else>No products found!</p>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '../store/cart';
import { fetchProducts } from '../services/productServices';

export default {
  setup() {
    const products = ref([]);
    const productUnits = ref({});
    const selectedCategory = ref('');
    const minPrice = ref('');
    const maxPrice = ref('');
    const cartStore = useCartStore();

    const categories = computed(() => {
      const uniqueCategories = new Set(products.value.map((product) => product.category));
      return Array.from(uniqueCategories);
    });

    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        const matchesCategory =
          !selectedCategory.value || product.category === selectedCategory.value;
        const matchesPrice =
          (!minPrice.value || product.price >= minPrice.value) &&
          (!maxPrice.value || product.price <= maxPrice.value);
        return matchesCategory && matchesPrice;
      });
    });

    const addToCart = (product) => {
      const units = productUnits.value[product.id] || 1;
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

    return {
      products,
      productUnits,
      addToCart,
      categories,
      selectedCategory,
      filteredProducts,
      minPrice,
      maxPrice,
    };
  },
};
</script>
<style>
.container {
  display: flex;
  gap: 1rem;
}

/* Filter Sidebar */
.filter-sidebar {
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9f9f9;
}

.filter-sidebar h3 {
  margin-bottom: 1rem;
  text-align: center;
}

.filter-category,
.filter-price {
  margin-bottom: 1.5rem;
}

.filter-category label,
.filter-price label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.filter-category select,
.price-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filter-price .price-input {
  width: calc(50% - 5px);
  display: inline-block;
  margin: 0 2.5px;
}

/* Product List */
.product-list {
  flex: 1;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
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
