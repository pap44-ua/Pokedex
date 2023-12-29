<template>
    <div>
      <h1>Perfil del Moderador</h1>
      <div v-if="profileData">
        <p><strong>Usuario:</strong> {{ profileData.Usuario }}</p>
        <p><strong>Nombre:</strong> {{ profileData.Nombre }}</p>
        <p><strong>Email:</strong> {{ profileData.email }}</p>
      </div>
      <div v-else>
        <p>Cargando perfil...</p>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  import { useUserStore } from '../stores/UserStore';
  
  export default {
    data() {
      return {
        profileData: null,
      };
    },
    created() {
      // Obtener el nombre de usuario desde el UserStore
      const username = useUserStore().user;
        console.log('Nombre de usuario:', username);
      // Hacer la llamada a la API para obtener el perfil del moderador
      this.fetchModeratorProfile(username);
    },
    methods: {
        async fetchModeratorProfile(username) {
            try {
            const token = localStorage.getItem('token'); // Obtener el token del localStorage
            const response = await api.get(`http://192.168.1.105:3000/moderador/ver/${username}`, {
                headers: {
                Authorization: `${token}`,
                },
            });
            console.log('Respuesta de la API:', response);
            this.profileData = response.data;
            } catch (error) {
            console.error('Error al obtener el perfil del moderador:', error);
            this.error = 'Error al obtener datos de la API';
            }
        },
        },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente si es necesario */
  </style>
  