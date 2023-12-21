// router.js
import { createRouter, createWebHistory } from 'vue-router';
import PagInicio from './views/PagInicio.vue';
import LogIn from './views/LogIn.vue';
import PokemonList from '@/views/ItemList.vue';
const routes = [
    {
      path: '/',
      component: PagInicio,
      children: [
        { path: '/login', component: LogIn },
        { path: '/pokemon', component: PokemonList },
      ],
    },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
