<template>
    <div id="app">
      <h1>APIDEX</h1>
      <div class="admin-login-btn" @click="mostrarFormularioLogin">Admin Login</div>
      <div>
      <label for="tipoFiltro">Filtrar por tipo:</label>
      <input type="text" v-model="tipoFiltro" id="tipoFiltro" />
      <button @click="aplicarFiltro">Aplicar Filtro</button>
    </div>
      <div v-if="pokemonAleatorio">
        <h2>{{ pokemonAleatorio.nombre }}</h2>
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
          <!-- Agrega más propiedades según sea necesario -->
        </ul>
      </div>
    </div>
  </template>
  <script>
  import apiClient from '@/axios'; // Ajusta la ruta según la ubicación de tu archivo axios.js
  
  export default {
    data() {
      return {
        pokemonAleatorio: null,
      };
    },created() {
    this.obtenerPokemonAleatorio();
    },
    methods: {
      async obtenerPokemonAleatorio() {
        try {
          const response = await apiClient.get('/pokemon/random');
          this.pokemonAleatorio = response.data;
        } catch (error) {
          console.error('Error al obtener el Pokémon aleatorio:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    height: 100vh; /* Esto asegura que ocupe el 100% de la altura visible del dispositivo */
    }

    .admin-login-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
}
  </style>
  