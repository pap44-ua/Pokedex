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
    <div>
      <h1>Editar Pokémon</h1>
        <div class="pokemon-input">
        <label>Nombre:</label>
        <input v-model="pokemonInfo.nombre" placeholder="Nombre del Pokémon">
        </div>
        <div class="pokemon-input">
        <label>Número de Pokédex:</label>
        <input v-model="pokemonInfo.numeroPokedex" placeholder="Número de Pokédex">
        </div>
            <div class="pokemon-input">
            <label>Puntos de Salud (PS):</label>
            <input v-model="pokemonInfo.pS" placeholder="Puntos de Salud (PS)">
            </div>
            <div class="pokemon-input">
            <label>Ataque (ATK):</label>
            <input v-model="pokemonInfo.atk" placeholder="Ataque (ATK)">
            </div>
            <div class="pokemon-input">
            <label>Defensa (DEF):</label>
            <input v-model="pokemonInfo.def" placeholder="Defensa (DEF)">
            </div> 
            <div class="pokemon-input">
            <label>Ataque Especial (SpAtk):</label>
            <input v-model="pokemonInfo.SpAtk" placeholder="Ataque Especial (SpAtk)">
            </div>
            <div class="pokemon-input">
            <label>Defensa Especial (SpDef):</label>
            <input v-model="pokemonInfo.SpDef" placeholder="Defensa Especial (SpDef)">
            </div>
            <div class="pokemon-input">
            <label>Velocidad (Spe):</label>
            <input v-model="pokemonInfo.Spe" placeholder="Velocidad (Spe)">
            </div>
            <div class="pokemon-input">
            <label>Tipo 1 (tipo1):</label>
            <input v-model="pokemonInfo.tipo1" placeholder="Tipo 1 (tipo1)">
            </div>
            <div class="pokemon-input">
            <label>Tipo 2 (tipo):</label>
            <input v-model="pokemonInfo.tipo2" placeholder="Tipo 2 (tipo)">
            </div>
            <div class="pokemon-input">
            <label>Nº pokedex de evolucion (evolucion):</label>
            <input v-model="pokemonInfo.evolucion" placeholder="Nº pokedex de evolucion (evolucion)">
            </div>
            <div class="pokemon-input">
            <label>Nº de las habilidades (habilidad):</label>
            <input v-model="pokemonInfo.habilidad" placeholder="Nº de las habilidades (habilidad)">
            
          <!-- Botón para añadir Pokémon -->
         
        </div>
      
      <button @click="actualizarPokemon">Actualizar</button>
    </div>
  </div>
  </template>
  
  <script>
  //import api from '../services/api';
  import { useUserStore } from '../stores/UserStore';
  import { useApiStore } from '../stores/MethodStore';
  export default {
    data() {
      return {
        pokemonInfo: {
          nombre: '',
          numeroPokedex: '',
          pS: '',
          atk: '',
          def: '',
          SpAtk: '',
          SpDef: '',
          Spe: '',
          tipo1: '',
          tipo2: '',
          evolucion: '',
          habilidad: '',
          // Agrega más campos según sea necesario
        },
        showOptions: false,
      };
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
      async buscarPokemonActual() {
        try {
          const nombreOId = this.$route.params.id;
          const response = await useApiStore().findPokemon(nombreOId);
          this.pokemonInfo = { ...response.data }; // Actualiza pokemonInfo con los datos existentes
        } catch (error) {
          console.error('Error al buscar el Pokémon:', error);
        }
      },
      async actualizarPokemon() {
        try {
            const id = this.$route.params.id;
            const token = localStorage.getItem('token');

            if (!token) {
            console.error('Token de autenticación no encontrado');
            return;
            }
            const datosActualizados = JSON.parse(JSON.stringify(this.pokemonInfo));

            // Configurar los encabezados de la solicitud con el token
            const headers = {
            Authorization: `${token}`,
            };

            console.log('Datos actualizados:', datosActualizados);

            const response = await useApiStore().actualizarPokemon(datosActualizados,headers,id);

            console.log('Respuesta de la API:', response);

            this.$router.push('/listar-pokemons');
        } catch (error) {
            console.error('Error al actualizar el Pokémon:', error);
        }
      },
    logout() {
      useUserStore().logout();
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    },
    mounted() {
      // Llama a buscarPokemonActual cuando el componente se monta
      this.buscarPokemonActual();
    },
  };
  </script>


  <style scoped>
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
  