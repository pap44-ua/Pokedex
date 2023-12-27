// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import { useAuthStore } from './stores/auth';
import { routes } from './services/api';

const app = createApp(App);
const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(pinia);
app.use(router);
pinia.use(useAuthStore);

app.mount('#app');

