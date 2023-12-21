<template>
  <div>
    <ul class="pokemon-grid">
      <li v-for="item in items" :key="item.id">
        <div class="pokemon-card">
          <p>{{ item.name }}</p>
          <p>{{ item.pokedexNumber }}</p>
          <button @click="showDetails(item)">Ver Detalles</button>
          <button @click="editItem(item)">Editar</button>
          <button @click="deleteItem(item.id)">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import apiClient from '@/axios';


export default {
  
  methods: {
    async showDetails(item) {
      try {
        const response = await apiClient.get(`/pokemon/${item.numeroPokedex}`);
        // Lógica para mostrar detalles usando la respuesta del servidor
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
      }
    },
    async editItem(item) {
      try {
        // Puedes implementar una lógica para mostrar un formulario de edición
        console.log('Editando:', item);
      } catch (error) {
        console.error('Error al editar el Pokémon:', error);
      }
    },
    async deleteItem(numeroPokedex) {
      try {
        await apiClient.delete(`/pokemon/${numeroPokedex}`);
        // Lógica para actualizar la lista después de eliminar
        console.log('Eliminado:', numeroPokedex);
      } catch (error) {
        console.error('Error al eliminar el Pokémon:', error);
      }
    },
  },
};
</script>

<style scoped>
.pokemon-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.pokemon-card {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
</style>
