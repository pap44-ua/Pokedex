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
        <div class="separar">
            <button type="submit" class="animated-button" @click="buscarPokemon">Buscar Pokemon</button>
          </div>
        <div class="dropdown">
          <div class="separar">
            <button type="submit" class="animated-button" @click="mostrarTipos">Tipos</button>
          </div>
        <div v-show="tipos.length > 0" class="dropdown-content">
          <button v-for="tipo in tipos" :key="tipo" @click="filtrarPorTipo(tipo)">{{ tipo }}</button>
        </div>
      </div>
      </div>


    <h1 class="main-content">Pokemons</h1>
    <div class="pokemon-grid">
      <div v-for="pokemon in pokemons" :key="pokemon.numeroPokedex" @click="redirigirAInfoPokemon($event, pokemon)">
        <img
        :src="'https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/' + pokemon.nombre.toLowerCase() + '.gif'"
        @mouseover="mostrarDetallesPokemon(pokemon)"
        @mouseleave="restablecerDetallesPokemon"
      />
        <p>{{ pokemon.numeroPokedex }}</p>
        <p>{{ pokemon.nombre }}</p>

        <div v-if="loggedIn">
          <button @click="editarPokemon(pokemon)">Editar</button>
          <button @click="borrarPokemon(pokemon)">Borrar</button>
        </div>
        <div v-if="pokemonDetail" class="modal">
          <p>PS: {{ pokemonDetail.pS }}</p>
          <p>ATK: {{ pokemonDetail.atk }}</p>
          <p>DEF: {{ pokemonDetail.def }}</p>
          <p>SpAtk: {{ pokemonDetail.SpAtk }}</p>
          <p>SpDef: {{ pokemonDetail.SpDef }}</p>
          <p>Spe: {{ pokemonDetail.Spe }}</p>
          <p>Tipo 1: {{ pokemonDetail.tipo1 }}</p>
          <p>Tipo 2: {{ pokemonDetail.tipo2 }}</p>
          <p>Evolucion: {{ pokemonDetail.evolucion }}</p>
          <p>Habilidad: {{ pokemonDetail.habilidad }}</p>
  
        </div>
      </div>
    </div>
    <div class="pagination">
  <button @click="obtenerPokemons(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
  <span>{{ currentPage }} / {{ totalPages }}</span>
  <button @click="obtenerPokemons(currentPage + 1)" :disabled="currentPage === totalPages" >Siguiente</button>
</div>


  </div>

</template>

<script>
//import api from '../services/api';
import { useUserStore } from '../stores/UserStore';
import { usePokemonStore } from '../stores/ListStore';
import { useApiStore } from '../stores/MethodStore';

export default {
  data() {
    return {
      pokemons: [],
      showOptions: false,
      searchTerm: '',
      tipos: [],
      currentPage: 1,
    totalPages: 1,
    pokemonDetail: null,
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
      mostrarDetallesPokemon(pokemon) {
      this.pokemonDetail = pokemon;
    },

    restablecerDetallesPokemon() {
      this.pokemonDetail = null;
    },

    redirigirAInfoPokemon(event, pokemon) {
    // Verificar si el clic provino de la imagen
    if (event.target.tagName.toLowerCase() === 'img') {
      this.$router.push({ name: 'info-pokemon', params: { id: pokemon.numeroPokedex } });
    }
  },
    async borrarPokemon(pokemon)
    {
      try {
    // Verificar si el usuario ha iniciado sesión
    if (!this.loggedIn) {
      console.error('Debes iniciar sesión para borrar un Pokémon');
      // Puedes manejar esto según tus necesidades, como redirigir a iniciar sesión
      return;
    }

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
    //await api.delete(`http://192.168.1.105:3000/pokemon/borrar/${pokemon.numeroPokedex}`, { headers });
    await useApiStore().deletePokemon(pokemon.numeroPokedex, headers);
    // Actualizar la lista de pokémons eliminando el que acabamos de borrar
    this.pokemons = this.pokemons.filter(p => p.numeroPokedex !== pokemon.numeroPokedex);
  } catch (error) {
    console.error('Error al borrar el Pokémon:', error);
    // Manejar el error, mostrar un mensaje, etc.
  }
    },
    async editarPokemon(pokemon) {
      try {
    // Verificar si el objeto pokemon está definido
    if (!pokemon || !pokemon.numeroPokedex) {
      console.error('El Pokémon no está definido correctamente');
      // Puedes manejar esto según tus necesidades, mostrar un mensaje, etc.
      return;
    }

    // Obtén el ID del Pokémon desde la información actual del Pokémon
    const id = pokemon.numeroPokedex;

    // Redirige al usuario a la ruta de edición
    this.$router.push({ name: 'editar-pokemon', params: { id } });
    
  } catch (error) {
    console.error('Error al editar el Pokémon:', error);
    // Manejar el error, mostrar un mensaje, etc.
  }
      },
    
    async obtenerPokemons(page = 1) {
  try {
    const response = await useApiStore().getAllPokemons(page);
    
      // Accede a los datos de la respuesta
      const responseData = response;
      console.log("RESPONSE DATA SOLO",responseData);
      console.log("RESPONSE DATA",responseData.pokemons);
      console.log("RESPONSE DATA CURRENT",responseData.currentPage);
      console.log("RESPONSE DATA TOTAL",responseData.totalPages);

      // Actualiza la lista de pokémons con el resultado de la paginación
      this.totalPages = responseData.totalPages;
      this.currentPage = responseData.currentPage;
      this.pokemons = responseData.pokemons;
      //console.log("POKEMONS",this.pokemons[0].nombre);
    
      usePokemonStore().setPokemons(responseData);
    
      // Puedes mostrar un mensaje de error al usuario si lo consideras necesario
    
  } catch (error) {
    console.error('Error al obtener la lista de Pokémon:', error);
    // Puedes mostrar un mensaje de error al usuario si lo consideras necesario
  }
},
    
    logout() {
      useUserStore().logout();
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    async buscarPokemon() {
      try {
        //const response = await api.get(`/pokemon/buscar/${this.searchTerm}`);
        const response = await useApiStore().findPokemon(this.searchTerm);
        console.log("RESPUESTA FILTRO",response.data);
        this.pokemons = [response.data];
        
      } catch (error) {
        console.error('Error al realizar la búsqueda de Pokémon:', error);

      }
    },
    async mostrarTipos() {
      try {
        //const response = await api.get('/pokemon/tipos');
        const response = await useApiStore().mostrarTiposPokemon();
        if (response.status === 200) {
          // Almacena los tipos en la variable tipos
          this.tipos = response.data;
        } else {
          console.error('Error al obtener los tipos de Pokémon:', response.data.error);
          // Puedes mostrar un mensaje de error al usuario si lo consideras necesario
        }
      } catch (error) {
        console.error('Error al obtener los tipos de Pokémon:', error);
        // Puedes mostrar un mensaje de error al usuario si lo consideras necesario
      }
    },
    async filtrarPorTipo(tipo, page = 1, perPage = 10) {
  try {
    const response = await useApiStore().filtrarPorTipo(tipo, page, perPage);
    if (response.status === 200) {
      // Accede a los datos de la respuesta
      const responseData = response.data;

      // Actualiza la lista de pokémons con el resultado del filtro por tipo y paginación
      this.pokemons = responseData.pokemons;
      this.currentPage = responseData.currentPage;
      this.totalPages = responseData.totalPages;
    } else {
      console.error('Error al filtrar Pokémon por tipo:', response.data.error);
      // Puedes mostrar un mensaje de error al usuario si lo consideras necesario
    }
  } catch (error) {
    console.error('Error al filtrar Pokémon por tipo:', error);
    // Puedes mostrar un mensaje de error al usuario si lo consideras necesario
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

.modal {
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

</style>
