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

<<<<<<< HEAD
<<<<<<< Updated upstream
=======
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const requiereAutenticacion = to.matched.some(route => route.meta.requiereAutenticacion);

  if (requiereAutenticacion && !token) {
    // El usuario no está autenticado y trata de acceder a una ruta que requiere autenticación, redirige a la página de inicio de sesión.
    next('/iniciar-sesion');
  } else {
    next();
  }
});

>>>>>>> parent of c363f78 (jdfsgdf)
export default router;
=======
export default routes; // Exporta solo las rutas
export { router }; // También exporta el router si es necesario en otro lugar
>>>>>>> Stashed changes
