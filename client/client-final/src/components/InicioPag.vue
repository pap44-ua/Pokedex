<template>
  <div id="app">
   

    <div class="main-content">
      <nav class="navbar">
        <router-link to="/">Inicio</router-link>
        <router-link to="/listar-pokemons">Listar Pokémons</router-link>

        <!-- Mostrar "Iniciar sesión" o nombre de usuario -->
        <span v-if="!loggedIn">
          <router-link to="/iniciar-sesion">Iniciar sesión</router-link>
        </span>
        <span v-if="loggedIn"> 
          <router-link to="/ver-perfil">{{ username }}</router-link>
        </span>
      </nav>

      <h1>APIDEX</h1>
      
      <div class="main-content">
        <div v-if="pokemonAleatorio" class="main-content">
        <h2>{{ pokemonAleatorio.nombre }}</h2>
        <img :src="'https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/' + pokemonAleatorio.nombre.toLowerCase() + '.gif'" />

        <ul>
          <li><strong>Número de Pokédex:</strong> {{ pokemonAleatorio.numeroPokedex }}</li>
          <li><strong>Puntos de Salud (PS):</strong> {{ pokemonAleatorio.pS }}</li>
          <li><strong>Ataque (ATK):</strong> {{ pokemonAleatorio.atk }}</li>
          <li><strong>Defensa (DEF):</strong> {{ pokemonAleatorio.def }}</li>
          <li><strong>Ataque Especial (SpAtk):</strong> {{ pokemonAleatorio.SpAtk }}</li>
          <li><strong>Defensa Especial (SpDef):</strong> {{ pokemonAleatorio.SpDef }}</li>
          <li><strong>Velocidad (Spe):</strong> {{ pokemonAleatorio.Spe }}</li>
          <li><strong>Tipo 1 (tipo1):</strong> {{ pokemonAleatorio.tipo1 }}</li>
          <li><strong>Tipo 2 (tipo):</strong> {{ pokemonAleatorio.tipo2 }}</li>
          <li><strong>Nº pokedex de evolucion (evolucion):</strong> {{ pokemonAleatorio.evolucion }}</li>
          <li><strong>Nº de las habilidades (habilidad):</strong> {{ pokemonAleatorio.habilidad }}</li>
        </ul>
     
      </div>

      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
import { useUserStore } from '../stores/UserStore';

export default {
  data() {
    return {
      pokemonAleatorio: null,
    };
  },
  created() {
    this.obtenerPokemonAleatorio();
  },
  computed: {
    loggedIn() {
      return useUserStore().user !== null;
    },
    username() {
      return useUserStore().user;
    },
  },
  methods: {
    async obtenerPokemonAleatorio() {
    try {
      const response = await api.get('/pokemon/random');
      console.log('Respuesta de la API:', response);
      this.pokemonAleatorio = response.data;
    } catch (error) {
      console.error('Error al obtener el Pokémon aleatorio:', error);
      this.error = 'Error al obtener datos de la API';
    }
  },
    redirectToLogIn() {
      this.$router.push('/iniciar-sesion');
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
}

.navbar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.navbar a {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}



</style>
