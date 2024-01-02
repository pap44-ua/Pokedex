<template>
  <div>
    <nav class="navbar">
        <router-link to="/">Inicio</router-link>
        <router-link to="/listar-pokemons">Listar Pokémons</router-link>

        <!-- Mostrar "Iniciar sesión" o nombre de usuario -->
        <span v-if="!loggedIn">
          <router-link to="/iniciar-sesion">Iniciar sesión</router-link>
        </span>
        <span v-if="loggedIn" @click="showOptions = !showOptions" class="navbar-username">
          {{ username }}
          <div v-show="showOptions" class="options-container">
            <router-link to="/ver-perfil">Ver perfil</router-link>
            <span @click="logout">Cerrar sesión</span>
          </div>
        </span>
      </nav>

      <div class="search-container">
        <input v-model="searchTerm" placeholder="Buscar por nombre o ID">
        <button @click="buscarPokemon">Buscar</button>
        <button @click="mostrarTipos">Mostrar Tipos</button>
      </div>

    <h1 class="main-content">Pokemons</h1>
    <div class="pokemon-grid">
      <div v-for="pokemon in pokemons" :key="pokemon.numeroPokedex" @click="redirigirAInfoPokemon(pokemon)">
        <img :src="'https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/' + pokemon.nombre.toLowerCase() + '.gif'" />

        <p>{{ pokemon.numeroPokedex }}</p>
        <p>{{ pokemon.nombre }}</p>
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
      pokemons: [],
      showOptions: false,
      searchTerm: '',
    };
  },
  created() {
    this.obtenerPokemons();
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
    async obtenerPokemons() {
      try {
        const response = await api.get('/pokemon');
        this.pokemons = response.data;
      } catch (error) {
        console.error('Error al obtener la lista de Pokémon:', error);
      }
    },
    redirigirAInfoPokemon(pokemon) {
      this.$router.push({ name: 'info-pokemon', params: { id: pokemon.numeroPokedex } });
    },
    logout() {
      useUserStore().logout();
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    async buscarPokemon() {
      try {
        const response = await api.get(`/pokemon/buscar/${this.searchTerm}`);
        
        if (response.status === 200) {
          // Actualiza la lista de pokémons con el resultado de la búsqueda
          this.pokemons = [response.data];
        } else {
          // Maneja el caso en el que el servidor responde con un error
          console.error('Error al buscar Pokémon:', response.data.error);
          // Puedes mostrar un mensaje al usuario si lo consideras necesario
        }
      } catch (error) {
        console.error('Error al realizar la búsqueda de Pokémon:', error);
        // Puedes mostrar un mensaje al usuario si lo consideras necesario
      }
    },
    async mostrarTipos()
    {
      try {
        const response = await api.get('/pokemon/tipos');
        this.pokemons = response.data;
      } catch (error) {
        console.error('Error al obtener la lista de Pokémon:', error);
      }
    }
  },
};
</script>

<style>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.pokemon-grid > div {
  border: 1px solid #ccc;
  padding: 16px;
  cursor: pointer;
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
  align-items: center;
  padding: 10px;
}

.navbar a,
.navbar-username {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  margin-right: 10px;
}

.options-container a,
.options-container span {
  margin-bottom: 10px;
}

.navbar-username {
  margin: 0 10px;
  position: relative;
}

.options-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.pokemon-grid > div {
  border: 1px solid #ccc;
  padding: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-grid img {
  object-fit: cover;
  max-width: 100%; 
  max-height: 100%; 
}
</style>
