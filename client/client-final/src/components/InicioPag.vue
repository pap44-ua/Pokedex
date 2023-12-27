<template>
  <div id="app">
    

    <div class="main-content">
      <nav class="navbar">
        <router-link to="/">Inicio</router-link>
        <router-link to="/listar-pokemons">Listar Pokémons</router-link>
      </nav>
      <button class="login-btn" @click="redirectToLogIn">Iniciar Sesión</button>
      <h1>APIDEX</h1>
<<<<<<< Updated upstream
      <button v-if="!isLoggedIn" @click="redirectToLogIn" class="admin-login-btn">Admin Login</button>
      <div>
        <div v-if="pokemonAleatorio">
=======
      
      <div class="main-content">
        <div v-if="pokemonAleatorio" class="main-content">
>>>>>>> Stashed changes
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
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      pokemonAleatorio: null,
    };
  },
  created() {
    this.obtenerPokemonAleatorio();
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
