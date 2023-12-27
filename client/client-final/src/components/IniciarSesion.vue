<template>
  <div>
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <label for="username">Usuario:</label>
      <input v-model="username" type="text" required />

      <label for="password">Contraseña:</label>
      <input v-model="password" type="password" required />

      <button type="submit" :disabled="isLoading">Iniciar Sesión</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    isLoading() {
      return useAuthStore.$state.isLoading;
    },
    error() {
      return useAuthStore.$state.error;
    },
  },
  methods: {
    async handleLogin() {
      await useAuthStore.login(this.username, this.password);
      if (useAuthStore.$state.isAuthenticated) {
        // Redirige a la página principal o realiza acciones post inicio de sesión
        this.$router.push('/dashboard');
      }
    },
  },
};
</script>
