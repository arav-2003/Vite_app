import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import CartPage from '../components/CartPage.vue';
import ProductPage from '../components/ProductPage.vue';


const routes = [
  { path: '/', component: HomePage },
  { path: '/product', component: ProductPage},
  { path: '/cart', component:CartPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
