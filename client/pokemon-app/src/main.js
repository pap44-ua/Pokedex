// main.js
import { createApp } from 'vue';
import App from './views/PagInicio.vue'; // Usa PagInicio.vue como componente principal
import router from './router';

createApp(App)
  .use(router)
  .mount("#app");
