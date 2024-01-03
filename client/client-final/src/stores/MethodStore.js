import { defineStore } from 'pinia';

export const useApiStore = defineStore({
  id: 'methods',
  state: () => ({
    // Puedes agregar otras propiedades relacionadas con la API si es necesario
  }),
  actions: {
    async get(endpoint) {
      try {
        // Lógica para realizar una solicitud GET al servidor
        const response = await api.get(endpoint);
        return response.data;
      } catch (error) {
        console.error('Error en la solicitud GET:', error);
        throw error;
      }
    },
    async post(endpoint, data) {
      try {
        // Lógica para realizar una solicitud POST al servidor
        const response = await api.post(endpoint, data);
        return response.data;
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
        throw error;
      }
    },
    async put(endpoint, data) {
      try {
        // Lógica para realizar una solicitud PUT al servidor
        const response = await api.put(endpoint, data);
        return response.data;
      } catch (error) {
        console.error('Error en la solicitud PUT:', error);
        throw error;
      }
    },
    async delete(endpoint) {
      try {
        // Lógica para realizar una solicitud DELETE al servidor
        const response = await api.delete(endpoint);
        return response.data;
      } catch (error) {
        console.error('Error en la solicitud DELETE:', error);
        throw error;
      }
    },
    // Puedes agregar otros métodos según tus necesidades
  },
});