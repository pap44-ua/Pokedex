<template>
    <div>
      <h2>{{ selectedItem.name }} Detalles</h2>
      <!-- Muestra más detalles aquí -->
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      selectedItem() {
        // Obtén el elemento seleccionado desde el store
      },
    },
  };
  </script>
  