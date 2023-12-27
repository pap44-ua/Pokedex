import { createRouter, createWebHistory } from 'vue-router';

import InicioPag from './components/InicioPag.vue';
import IniciarSesion from './components/IniciarSesion.vue';
import ListarPokemons from './components/ListarPokemons.vue';
import InfoPokemon from './components/InfoPokemon.vue';

const routes = [
  { path: '/', component: InicioPag },
  { path: '/iniciar-sesion', component: IniciarSesion },
  { path: '/listar-pokemons', component: ListarPokemons },
  { path: '/info-pokemon/:id', name: 'info-pokemon', component: InfoPokemon },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: 'hash',
});

<<<<<<< Updated upstream
export default router;
=======
export default routes; // Exporta solo las rutas
export { router }; // También exporta el router si es necesario en otro lugar
>>>>>>> Stashed changes
