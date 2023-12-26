<template>
    <div class="main-content">
      <nav class="navbar">
        <router-link to="/">Inicio</router-link>
        <router-link to="/listar-pokemons">Listar Pokémons</router-link>
      </nav>
      <h1>{{ pokemon.nombre }}</h1>
      <img :src="'https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/' + pokemon.nombre.toLowerCase() + '.gif'" />

      <ul>
          <li><strong>Número de Pokédex:</strong> {{ pokemon.numeroPokedex }}</li>
          <li><strong>Puntos de Salud (PS):</strong> {{ pokemon.pS }}</li>
          <li><strong>Ataque (ATK):</strong> {{ pokemon.atk }}</li>
          <li><strong>Defensa (DEF):</strong> {{ pokemon.def }}</li>
          <li><strong>Ataque Especial (SpAtk):</strong> {{ pokemon.SpAtk }}</li>
          <li><strong>Defensa Especial (SpDef):</strong> {{ pokemon.SpDef }}</li>
          <li><strong>Velocidad (Spe):</strong> {{ pokemon.Spe }}</li>
          <li><strong>Tipo 1 (tipo1):</strong> {{ pokemon.tipo1 }}</li>
          <li><strong>Tipo 2 (tipo):</strong> {{ pokemon.tipo2 }}</li>
          <li><strong>Nº pokedex de evolucion (evolucion):</strong> {{ pokemon.evolucion }}</li>
          <li><strong>Nº de las habilidades (habilidad):</strong> {{ pokemon.habilidad }}</li>
        </ul>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        pokemon: null,
      };
    },
    created() {
      const id = this.$route.params.id; // Obtener el ID desde los parámetros de la ruta
      this.obtenerInfoPokemon(id);
    },
    methods: {
      async obtenerInfoPokemon(id) {
        try {
          const response = await api.get(`/pokemon/buscar/${id}`);
          this.pokemon = response.data;
        } catch (error) {
          console.error('Error al obtener información del Pokémon:', error);
        }
      },
    },
  };



  </script>

  <style>

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
}</style>
  