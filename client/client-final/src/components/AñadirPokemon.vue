<template>
    <div class="main-content">
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
      <!-- Botón para añadir Pokémon -->
      <button class="add-button" @click="agregarPokemon">Añadir</button>
      <div v-if="mensajeAgregado" class="success-message">
        Pokémon agregado exitosamente.
      </div>
      </div>    
    </div>

</template>

<script>
import { useApiStore } from '../stores/MethodStore';

export default{
    data() {
        return {
            pokemonInfo: [{
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
            }],
            mensajeAgregado: false,
        };
    },
    methods: {
        async agregarPokemon() {
            try {
                const token = localStorage.getItem('token');

                const headers = {
                Authorization: `${token}`,
                };
            // Llama a la función addPokemon de la tienda
                await useApiStore().addPokemon(this.pokemonInfo[0], headers);

            // Restablece la información del Pokémon para futuras adiciones
                this.pokemonInfo = [{
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
                }];

                // Muestra un mensaje de éxito
                this.mensajeAgregado = true;
                this.$router.push('/listar-pokemons');
                } catch (error) {
                console.error('Error al agregar el Pokémon:', error);
                // Puedes manejar el error, mostrar un mensaje de error, etc.
                }
        },
        },

}


</script>

<style scoped>

.main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pokemon-container {
    flex: 1;
    margin-left: 20px; /* Espacio entre la sección de Pokémon y la información del usuario */
  }

  .pokemon-input {
    margin-bottom: 30px;
  }
  .add-button {
    margin-bottom: 30px;
    width: auto; /* Establecer el ancho automático para evitar que se vea alargado verticalmente */
  }

.error-message {
    color: red;
    font-weight: bold;
}
</style>