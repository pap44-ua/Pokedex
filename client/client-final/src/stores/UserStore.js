import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'UserStore',
  state: () => ({
    user: null,
    password: null,
  }),

  actions: {
    async loginUser(credentials) {
      console.log("loginUser");
      this.$patch({
        user: credentials.user,
        password: credentials.password,
      });
    },
    async logout() {
      console.log("logout");
      this.$reset(); // Restablecer el estado a su valor inicial
    },
  },
});
