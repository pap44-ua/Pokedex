
<template>
  <div id="app">
    <Sidebar /> 

    <div class="main-content">
      
      <h1>APIDEX</h1>
      <button v-if="!isLoggedIn" @click="redirectToLogIn" class="admin-login-btn">Admin Login</button>
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
        </ul>
          <!-- Agrega más propiedades según sea necesario -->
        <!-- Contenido de Pokemon -->
      </div>
    </div>
  </div>
</template>

  <script>
  import apiClient from '@/axios'; // Ajusta la ruta según la ubicación de tu archivo axios.js
  import Sidebar from './SideBar.vue';


  export default {
    components: {
    Sidebar,
    
  },
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
      redirectToLogIn() {
      // Usar this.$router para navegar a la ruta LogIn
      this.$router.push('/login');
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
  align-items: center; /* Alinea los elementos a la izquierda */
  margin-left: 20px; /* Margen izquierdo para separar de la barra lateral */
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
  