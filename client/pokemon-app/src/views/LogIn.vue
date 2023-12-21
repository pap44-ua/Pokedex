<template>
    <div>
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" v-model="username" id="username" required />
  
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" id="password" required />
  
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Aquí puedes realizar la lógica de inicio de sesión
        // Por ejemplo, puedes llamar a una acción de Vuex o realizar una solicitud HTTP
  
        // Después de iniciar sesión con éxito, puedes redirigir al usuario a otra página
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Agrega estilos según sea necesario */
  </style>
  