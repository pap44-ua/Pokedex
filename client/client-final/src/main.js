import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia, PiniaVuePlugin } from 'pinia';

Vue.use(PiniaVuePlugin)
const pinia = createPinia()


new Vue({
  el: '#app',
  router, 
  pinia,
  render: h => h(App)
});
