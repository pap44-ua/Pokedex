<template>
    <div>
      <h1>{{ pokemon.nombre }}</h1>
      <!-- Mostrar otras propiedades del Pokémon aquí -->
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        pokemon: null,
      };
    },
    created() {
      const id = this.$route.params.id; // Obtener el ID desde los parámetros de la ruta
      this.obtenerInfoPokemon(id);
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
    },
  };
  </script>
  