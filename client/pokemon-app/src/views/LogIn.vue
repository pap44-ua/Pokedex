<template>
    <form @submit.prevent="login">
      <label>Login:</label>
      <input v-model="username" required>
      <label>Password:</label>
      <input v-model="password" type="password" required>
      <button type="submit">Login</button>
    </form>
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
      async login() {
        // Implementa la lógica de autenticación aquí
        // Guarda el token en el local storage
        // Actualiza el estado del usuario en el store
      },
    },
  };
  </script>