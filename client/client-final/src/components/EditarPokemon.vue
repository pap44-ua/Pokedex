<template>
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
  </template>
  
  <script>
  import api from '../services/api';
  
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
      };
    },
    methods: {
      async buscarPokemonActual() {
        try {
          const nombreOId = this.$route.params.id;
          const response = await api.get(`/pokemon/buscar/${nombreOId}`);
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

        // Obtener los datos actuales del Pokémon
        

        // Convertir a objeto plano para eliminar getters y setters
        const datosActualizados = JSON.parse(JSON.stringify(this.pokemonInfo));

        // Configurar los encabezados de la solicitud con el token
        const headers = {
        Authorization: `${token}`,
        };

        console.log('Datos actualizados:', datosActualizados);

        const response = await api.put(`/pokemon/actualizar/${id}`, datosActualizados, { headers });

        console.log('Respuesta de la API:', response);

        this.$router.push('/listar-pokemons');
    } catch (error) {
        console.error('Error al actualizar el Pokémon:', error);
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
  /* Puedes agregar estilos según tus necesidades */
  </style>
  