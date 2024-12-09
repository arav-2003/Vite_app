import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CartPage from '../views/CartPage.vue';
import ProductPage from '../views/ProductPage.vue';


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
