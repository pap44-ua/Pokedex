<template>
  <div class="main-content">
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

    <div v-if="loggedIn">
      <!-- Deshabilitar los botones si this.pokemon es null -->
      <button @click="borrarPokemon" :disabled="!pokemon">Borrar</button>
      <button @click="editarPokemon" :disabled="!pokemon">Editar</button>

    </div>

    <h1 v-if="pokemon && pokemon.nombre">{{ pokemon.nombre }}</h1>
    <img v-if="pokemon" :src="'https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/' + pokemon.nombre.toLowerCase() + '.gif'" />
    <ul v-if="pokemon">
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
  import { useUserStore } from '../stores/UserStore';
  
  export default {
    data() {
      return {
        pokemon: {},
        esUsuarioActual: false,
        showOptions: false,
      };
      
    },
    created() {
      const id = this.$route.params.id; 
      this.obtenerInfoPokemon(id);
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
      async obtenerInfoPokemon(id) {
        try {
          const response = await api.get(`/pokemon/buscar/${id}`);
          this.pokemon = response.data;
        } catch (error) {
          console.error('Error al obtener información del Pokémon:', error);
        }
      },
      async borrarPokemon() {
        try {
          // Obtener el token de localStorage
          const token = localStorage.getItem('token');

          // Verificar si hay un token antes de realizar la solicitud
          if (!token) {
            console.error('Token de autenticación no encontrado');
            // Puedes manejar esto de acuerdo a tus necesidades, redirigir a iniciar sesión, mostrar un mensaje, etc.
            return;
          }

          // Configurar los encabezados de la solicitud con el token
          const headers = {
            Authorization: `${token}`,
          };

          // Hacer la solicitud con los encabezados configurados
          await api.delete(`http://192.168.1.105:3000/pokemon/borrar/${this.pokemon.numeroPokedex}`, { headers });
          this.$router.push('/listar-pokemons');
          // Actualizar la interfaz o redirigir después de borrar el Pokémon
        } catch (error) {
          console.error('Error al borrar el Pokémon:', error);
          // Manejar el error, mostrar un mensaje, etc.
        }
      },
      async editarPokemon() {
        try {
          // Obtén el ID del Pokémon desde la información actual del Pokémon
          const id = this.pokemon.numeroPokedex;

          // Redirige al usuario a la ruta de edición
          this.$router.push({ name: 'editar-pokemon', params: { id } });
        } catch (error) {
          console.error('Error al editar el Pokémon:', error);
          // Manejar el error, mostrar un mensaje, etc.
        }
      },
      logout() {
      useUserStore().logout();
      if (this.$route.path !== '/') {
        this.$router.push('/');
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
  
  .navbar a,
.navbar-username {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  margin-right: 10px;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
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
  </style>