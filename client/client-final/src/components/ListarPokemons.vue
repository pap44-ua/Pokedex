<template>
  <div>
    <nav class="navbar">
        <router-link to="/">Inicio</router-link>
        <router-link to="/listar-pokemons">Listar Pokémons</router-link>
      </nav>
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

export default {
  data() {
    return {
      pokemons: [],
    };
  },
  created() {
    this.obtenerPokemons();
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
  margin-bottom: 20px;
}

.navbar a {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
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
  max-width: 100%; /* Asegura que la imagen no se extienda más allá del ancho del contenedor */
  max-height: 100%; /* Asegura que la imagen no se extienda más allá de la altura del contenedor */
}
</style>
