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
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogin = async () => {
  try {
    await authStore.login(this.username, this.password);
    // Después de iniciar sesión, redirige al usuario a la página de inicio
    router.push('/');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};



    return { authStore, handleLogin };
  },
  computed: {
    isLoading() {
      return this.authStore.$state.isLoading;
    },
    error() {
      return this.authStore.$state.error;
    },
  },
};
</script>
