// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './router';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

app.use(pinia);
app.use(router);
app.mount('#app');
