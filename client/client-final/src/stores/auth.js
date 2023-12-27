import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    error: null,
    token: null,
  }),
  actions: {
    async login(username, password) {
      try {
        // Realiza la llamada a la API de autenticación
        const response = await axios.post('/moderador/login', { Usuario: username, Contrasena: password });

        // Verifica el estado de la respuesta de la API
        if (response.status === 200 && response.data.token) {
          // Si la autenticación es exitosa, actualiza el estado
          this.isAuthenticated = true;
          this.user = { username }; // Puedes ajustar según la estructura de tu respuesta de usuario
          this.token = response.data.token;
          this.error = null;
        } else {
          // Maneja el caso en el que la autenticación falla
          this.isAuthenticated = false;
          this.user = null;
          this.token = null;
          this.error = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        }
      } catch (error) {
        // Maneja errores en la llamada a la API
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
        this.error = 'Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.';
        console.error(error); // Puedes registrar el error para debugging
        throw error; // Puedes rechazar la promesa para manejar el error en el componente que llama a esta acción
      }
    },
    logout() {
      // Lógica para cerrar sesión
      // Puedes llamar a la API correspondiente o simplemente limpiar el estado local
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      this.error = null;
    },
  },
});
