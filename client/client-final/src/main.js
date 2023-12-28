import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de que el nombre del archivo del enrutador sea correcto
import { createPinia, PiniaVuePlugin } from 'pinia';

Vue.use(PiniaVuePlugin)
const pinia = createPinia()


new Vue({
  el: '#app',
  router, // Asegúrate de que el nombre de la variable del enrutador sea correcto
  pinia,
  render: h => h(App)
});
