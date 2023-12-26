import Vue from 'vue';
import VueRouter from 'vue-router';
import InicioPag from './components/InicioPag.vue';
import IniciarSesion from './components/IniciarSesion.vue';
import ListarPokemons from './components/ListarPokemons.vue';
import InfoPokemon from './components/InfoPokemon.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: InicioPag },
  { path: '/iniciar-sesion', component: IniciarSesion },
  { path: '/listar-pokemons', component: ListarPokemons },
  { path: '/info-pokemon/:id', name: 'info-pokemon', component: InfoPokemon },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});

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

export default router;
