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

    <!-- Mostrar mensaje de error -->
    <div v-if="errorMensaje" style="color: red;">
      {{ errorMensaje }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usuario: '',
      password: '',
      errorMensaje: ''
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        // Realizar la solicitud de inicio de sesión
        const response = await axios.post('/moderador/login', {
          Usuario: this.usuario,
          Contrasena: this.password
        });

        // Verificar si se recibió un token en la respuesta
        const token = response.data.token;
        if (token) {
          // Almacenar el token en el almacenamiento local (puedes usar cookies o Vuex si es necesario)
          localStorage.setItem('jwtToken', token);

          // Redirigir a la ruta '/' después de un inicio de sesión exitoso
          this.$router.push('/');
        } else {
          // Manejar el caso en el que no se reciba un token
          this.errorMensaje = 'El servidor no proporcionó un token válido';
        }
      } catch (error) {
        // Manejar errores de la solicitud aquí
        console.error('Error en la solicitud:', error.response.data);

        // Mostrar el mensaje de error del servidor si está disponible
        this.errorMensaje = error.response.data.error || 'Credenciales incorrectas';
      }
    }
  }
};
</script>

<style>
/* Estilos del componente */
</style>
