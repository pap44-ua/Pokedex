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
      <div class="split-container">
      <div class="user-info">
        <h1>Perfil del Moderador</h1>
        <div v-if="profileData">
          <p><strong>Usuario:</strong> {{ profileData.Usuario }}</p>
          <p><strong>Nombre:</strong> {{ profileData.Nombre }}</p>
          <p><strong>Email:</strong> {{ profileData.email }}</p>
        </div>
        <div v-else>
          <p>Cargando perfil...</p>
        </div>
        
      </div>
      <div class="pokemon-container">
        <h2>Añadir Pokémon</h2>
        <div class="pokemon-input">
        <label>Nombre:</label>
        <input v-model="pokemonInfo[0].nombre" placeholder="Nombre del Pokémon">
        </div>
        <div class="pokemon-input">
        <label>Número de Pokédex:</label>
        <input v-model="pokemonInfo[0].numeroPokedex" placeholder="Número de Pokédex">
        </div>
        <div class="pokemon-input">
        <label>Puntos de Salud (PS):</label>
        <input v-model="pokemonInfo[0].pS" placeholder="Puntos de Salud (PS)">
        </div>
        <div class="pokemon-input">
        <label>Ataque (ATK):</label>
        <input v-model="pokemonInfo[0].atk" placeholder="Ataque (ATK)">
        </div>
        <div class="pokemon-input">
        <label>Defensa (DEF):</label>
        <input v-model="pokemonInfo[0].def" placeholder="Defensa (DEF)">
        </div> 
        <div class="pokemon-input">
        <label>Ataque Especial (SpAtk):</label>
        <input v-model="pokemonInfo[0].SpAtk" placeholder="Ataque Especial (SpAtk)">
        </div>
        <div class="pokemon-input">
        <label>Defensa Especial (SpDef):</label>
        <input v-model="pokemonInfo[0].SpDef" placeholder="Defensa Especial (SpDef)">
        </div>
        <div class="pokemon-input">
        <label>Velocidad (Spe):</label>
        <input v-model="pokemonInfo[0].Spe" placeholder="Velocidad (Spe)">
        </div>
        <div class="pokemon-input">
        <label>Tipo 1 (tipo1):</label>
        <input v-model="pokemonInfo[0].tipo1" placeholder="Tipo 1 (tipo1)">
        </div>
        <div class="pokemon-input">
        <label>Tipo 2 (tipo):</label>
        <input v-model="pokemonInfo[0].tipo2" placeholder="Tipo 2 (tipo)">
        </div>
        <div class="pokemon-input">
        <label>Nº pokedex de evolucion (evolucion):</label>
        <input v-model="pokemonInfo[0].evolucion" placeholder="Nº pokedex de evolucion (evolucion)">
        </div>
        <div class="pokemon-input">
        <label>Nº de las habilidades (habilidad):</label>
        <input v-model="pokemonInfo[0].habilidad" placeholder="Nº de las habilidades (habilidad)">
          </div>
          <button class="add-button" @click="agregarPokemon">Añadir</button>
          <div v-if="mensajeAgregado" class="success-message">
            Pokémon agregado exitosamente.
          </div>
        </div>
    
    </div>
  </div>
  </template>
  
  <script>
  //import axios from 'axios';
  //import api from '../services/api';
  import { useUserStore } from '../stores/UserStore';
  import { useApiStore } from '../stores/MethodStore';
  export default {
    data() {
      return {
        profileData: null,
        pokemonInfo: Array(8).fill({ nombre: '', numeroPokedex: '', pS: '',atk: '',def:'',SpAtk:'',SpDef:'',Spe:'',tipo1:'',tipo2:'',evolucion:'',habilidad:'' }),
        showOptions: false,
        mensajeAgregado: false,
      };
    },
    created() {
        const username = useUserStore().user;
        console.log('Nombre de usuario:', username);
        this.pokemonInfo = Array(12).fill({ nombre: '', numeroPokedex: '', pS: '', atk: '', def: '', SpAtk: '', SpDef: '', Spe: '', tipo1: '', tipo2: '', evolucion: '', habilidad: '' });
        this.fetchModeratorProfile(username);
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
      async agregarPokemon() {
        try {
          const token = localStorage.getItem('token');
          /*const response = await axios.post('http://localhost:3000/pokemon/crear', this.pokemonInfo[0], {
            headers: {
              Authorization: `${token}`,
            },
          });*/
          const headers = {
            Authorization: `${token}`,
          };

          const response = await useApiStore().addPokemon(this.pokemonInfo[0], headers);

          console.log('Respuesta de la API al agregar Pokémon:', response.data);
          this.mensajeAgregado = true;
      } catch (error) {
        console.error('Error al agregar el Pokémon:', error);
      }
      },
        async fetchModeratorProfile(username) {
            try {
                const response = await useApiStore().verPerfilModerador(username);
                console.log('Respuesta de la API MODERADOR:', response);
                this.profileData = response;
              } catch (error) {
                console.error('Error al obtener el perfil del moderador:', error);
                this.error = 'Error al obtener datos de la API';
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
  
  <style scoped>
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .split-container {
    display: flex;
    width: 80%;
  }

  .user-info {
    flex: 1;
    margin-right: 20px;
  }

  .pokemon-container {
    flex: 1;
    margin-left: 20px;
  }

  .pokemon-input {
    margin-bottom: 30px;
  }
  .add-button {
    margin-bottom: 30px;
    width: auto;
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

.success-message {
    color: green;
    font-weight: bold;
}

.error-message {
    color: red;
    font-weight: bold;
}
</style>
  