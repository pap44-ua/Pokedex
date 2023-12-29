<template>
  <div>
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="iniciarSesion">
      <div>
        <label for="usuario">Nombre de Usuario:</label>
        <input type="text" id="usuario" v-model="usuario" required>
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <button type="submit">Iniciar Sesión</button>
      </div>
    </form>

    <div v-if="errorMensaje" style="color: red;">
      {{ errorMensaje }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../stores/UserStore';

export default {
  data() {
    return {
      usuario: '',
      password: '',
      errorMensaje: ''
    };
  },
  methods: {
    iniciarSesion() {
      let responseData; // Variable para almacenar la respuesta de la solicitud

      axios.post('http://192.168.1.105:3000/moderador/login', {
        Usuario: this.usuario,
        Contrasena: this.password
      })
      .then((response) => {
        // Almacena la respuesta en la variable responseData
        responseData = response.data;

        const userStore = useUserStore();
        userStore.loginUser({ user: this.usuario, password: this.password });

        localStorage.setItem('token', responseData.token);
        console.log('Token:', responseData.token);
        this.$router.push('/');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Respuesta del servidor con error:', error.response.data);
          this.errorMensaje = error.response.data.mensaje;
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor');
        } else {
          console.error('Error al configurar la solicitud:', error.message);
        }
      });
    }
  }
};
</script>


<style>

</style>
