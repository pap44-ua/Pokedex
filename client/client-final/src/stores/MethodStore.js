import { defineStore } from 'pinia';
import api from '../services/api';

export const useApiStore = defineStore({
  id: 'methods',
  state: () => ({
    // Puedes agregar otras propiedades relacionadas con la API si es necesario
  }),
  actions: {
    async deletePokemon(numeroPokedex, headers) {
      try {
        await api.delete(`http://192.168.1.105:3000/pokemon/borrar/${numeroPokedex}`, { headers });
      } catch (error) {
        console.error('Error al borrar el Pokémon:', error);
        // Puedes manejar el error según tus necesidades, como mostrar un mensaje o redirigir.
      }
    },
    async getAllPokemons() {
      try {
        const response = await api.get('/pokemon');
        return response;
        }
        catch (error) {
          console.error('Error al obtener los Pokémon:', error);
          throw error;// Puedes manejar el error según tus necesidades, como mostrar un mensaje o redirigir.
        }
    },
   
    async findPokemon(item) {
        try {
          const response = await api.get(`/pokemon/buscar/${item}`);
          return response.data; // Retorna la respuesta para que pueda ser utilizada en el componente
        } catch (error) {
          console.error('Error al obtener el Pokémon:', error);
          throw error; // Propaga el error para que pueda ser manejado en el componente
        }
      },
  
      async mostrarTiposPokemon() {
        try {
          const response = await api.get('/pokemon/tipos');
          return response.data; // Retorna la respuesta para que pueda ser utilizada en el componente
        } catch (error) {
          console.error('Error al obtener los tipos de Pokémon:', error);
          throw error; // Propaga el error para que pueda ser manejado en el componente
        }
      },
  
      async obtenerPokemonAleatorio() {
        try {
          const response = await api.get('/pokemon/random');
          return response.data; // Retorna la respuesta para que pueda ser utilizada en el componente
        } catch (error) {
          console.error('Error al obtener el Pokémon aleatorio:', error);
          throw error; // Propaga el error para que pueda ser manejado en el componente
        }
      },
  
      async obtenerDetallesEvolucion(item) {
        try {
          const response = await api.get(`/pokemon/${item}/evolucion`);
          return response.data; // Retorna la respuesta para que pueda ser utilizada en el componente
        } catch (error) {
          console.error('Error al obtener los detalles de evolución del Pokémon:', error);
          throw error; // Propaga el error para que pueda ser manejado en el componente
        }
      },
  
      async filtrarPorTipo(tipo, page, perPage) {
        try {
          const response = await api.get(`/pokemon/tipo/${tipo}?page=${page}&per_page=${perPage}`);
          return response.data; // Retorna la respuesta para que pueda ser utilizada en el componente
        } catch (error) {
          console.error('Error al filtrar los Pokémon por tipo:', error);
          throw error; // Propaga el error para que pueda ser manejado en el componente
        }
      },
  
      async verPerfilModerador(item) {
        try {
          const response = await api.get(`/moderador/ver/${item}`);
          return response.data; // Retorna la respuesta para que pueda ser utilizada en el componente
        } catch (error) {
          console.error('Error al ver el perfil del moderador:', error);
          throw error; // Propaga el error para que pueda ser manejado en el componente
        }
      },
}
});