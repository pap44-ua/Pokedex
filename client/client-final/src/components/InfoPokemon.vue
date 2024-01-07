<template>
  <div class="main-content">
    <nav class="navbar">
        <router-link to="/">Inicio</router-link>
        <router-link to="/listar-pokemons">Listar Pokémons</router-link>

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
      <button @click="borrarPokemon" :disabled="!pokemon">Borrar</button>
      <button @click="editarPokemon" :disabled="!pokemon">Editar</button>

    </div>

    <h1 v-if="pokemon && pokemon.nombre">{{ pokemon.nombre }}</h1>
    <img v-if="pokemon && pokemon.nombre" :src="'https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/' + pokemon.nombre.toLowerCase() + '.gif'" />
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
          <li @mouseover="mostrarInfoEvolucion" @mouseleave="ocultarInfoEvolucion">
            <strong>Nº pokedex de evolucion (evolucion):</strong> 
            <span
              :class="{ 'evolution-link': showEvolutionModal }"
            >
              {{ pokemon.evolucion }}
            </span>
          </li>
          <li><strong>Nº de las habilidades (habilidad):</strong> {{ pokemon.habilidad }}</li>
        </ul>

        <div v-if="showEvolutionModal" class="evolution-modal">
          <img v-if="evolutionInfo && evolutionInfo.nombre" :src="'https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/' + evolutionInfo.nombre.toLowerCase() + '.gif'" />
          <h2><strong>Número de Pokédex:</strong>{{ evolutionInfo.nombre }}</h2>
          <h2><strong>Puntos de Salud (PS):</strong>{{ evolutionInfo.numeroPokedex }}</h2>
          <h2><strong>Ataque (ATK):</strong>{{ evolutionInfo.atk }}</h2>
          <h2><strong>Defensa (DEF):</strong>{{ evolutionInfo.def }}</h2>
          <h2><strong>Ataque Especial (SpAtk):</strong>{{ evolutionInfo.SpAtk }}</h2>
          <h2><strong> Defensa Especial (SpDef):</strong>{{ evolutionInfo.SpDef }}</h2>
          <h2><strong> Defensa Especial (SpDef):</strong>{{ evolutionInfo.SpDef }}</h2>
          <h2><strong>Velocidad (Spe):</strong> {{ evolutionInfo.Spe }}</h2>
          <h2><strong>Tipo 1 (tipo1):</strong>{{ evolutionInfo.tipo1 }}</h2>
          <h2><strong>Tipo 2 (tipo2):</strong>{{ evolutionInfo.tipo2 }}</h2>
        </div>

    </div>
  </template>
  
  <script>
  import { useApiStore } from '../stores/MethodStore';
//import api from '../services/api';
  import { useUserStore } from '../stores/UserStore';
  
  export default {
    data() {
      return {
        pokemon: {},
        esUsuarioActual: false,
        showOptions: false,
        showEvolutionModal: false,
        evolutionInfo: {},
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
      mostrarInfoEvolucion() {
        const evolutionId = this.pokemon.evolucion;

        if (evolutionId) {
          this.obtenerInfoPokemonEvolucion(evolutionId);
          this.showEvolutionModal = true;
        }
      },
      ocultarInfoEvolucion() {
        this.showEvolutionModal = false;
      },
      async obtenerInfoPokemonEvolucion(id) {
        try {
          const response = await useApiStore().findPokemon(id);
          this.evolutionInfo = response.data;
        } catch (error) {
          console.error('Error al obtener información de la evolución del Pokémon:', error);
        }
      },
      async obtenerInfoPokemon(id) {
        try {
          const response = await useApiStore().findPokemon(id);
          this.pokemon = response.data;
        } catch (error) {
          console.error('Error al obtener información del Pokémon:', error);
        }
      },
      async borrarPokemon() {
        try {

          const token = localStorage.getItem('token');

          if (!token) {
            console.error('Token de autenticación no encontrado');
            return;
          }

          const headers = {
            Authorization: `${token}`,
          };

          await useApiStore().deletePokemon(this.pokemon.numeroPokedex, headers);
          this.$router.push('/listar-pokemons');
        } catch (error) {
          console.error('Error al borrar el Pokémon:', error);
        }
      },
      async editarPokemon() {
        try {
          const id = this.pokemon.numeroPokedex;

          this.$router.push({ name: 'editar-pokemon', params: { id } });

        } catch (error) {
          console.error('Error al editar el Pokémon:', error);

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
.evolution-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 200;

}
.evolution-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  border: 1px solid blue; 
}
  </style>