import Vue from 'vue';
import VueRouter from 'vue-router';

import InicioPag from './components/InicioPag.vue';
import IniciarSesion from './components/IniciarSesion.vue';
import ListarPokemons from './components/ListarPokemons.vue';
import InfoPokemon from './components/InfoPokemon.vue';
import VerPerfil from './components/VerPerfil.vue';
import EditarPok from './components/EditarPokemon.vue';
import AñadirPok from './components/AñadirPokemon.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: InicioPag },
  { path: '/iniciar-sesion', component: IniciarSesion },
  { path: '/listar-pokemons', component: ListarPokemons },
  { path: '/info-pokemon/:id', name: 'info-pokemon', component: InfoPokemon },
  { path: '/ver-perfil', component: VerPerfil },
  { path: '/editar-pokemon/:id',name:'editar-pokemon', component: EditarPok },
  { path: '/anadir-pokemon', component: AñadirPok },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});

export default router;
