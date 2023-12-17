<template>
    <form @submit.prevent="saveItem">
      <label>Nombre:</label>
      <input v-model="item.name" required>
      <!-- Agrega más campos según tu modelo -->
      <button type="submit">Guardar</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        item: {
          name: '',
          // Agrega más propiedades según tu modelo
        },
      };
    },
    methods: {
      saveItem() {
        // Implementa la lógica para guardar/editar el elemento
      },
    },
  };
  </script>
  