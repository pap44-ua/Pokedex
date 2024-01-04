<template>
  <div class="container">
    <nav class="navbar">
      <router-link to="/">Inicio</router-link>
      <router-link to="/listar-pokemons">Listar Pokémons</router-link>

      
      <span v-if="!loggedIn">
        <router-link to="/iniciar-sesion">Iniciar sesión</router-link>
      </span>
      <span v-if="loggedIn" @click="showOptions = !showOptions" class="navbar-username">
        {{ username }}
        <div v-show="showOptions" class="options-container">
          <router-link to="/ver-perfil">Ver perfil</router-link>
          <span @click="logout">Cerrar sesión</span>
        </div>
      </span>
    </nav>  

    <div class="content">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="iniciarSesion">
        <div class="separar">
          <label for="usuario">Nombre de Usuario:</label>
          <input type="text" id="usuario" v-model="usuario" required>
        </div>
        <div class="separar">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="separar">
          <div class="separar">
            <button type="submit" class="animated-button" @click="iniciarSesion">Iniciar Sesión</button>
          </div>
        </div>
      </form>

      <div v-if="errorMensaje" style="color: red;">
        {{ errorMensaje }}
      </div>
    </div>
  </div>
</template>


<script>
//import axios from 'axios';
import { useUserStore } from '../stores/UserStore';
import { useApiStore } from '../stores/MethodStore';

export default {
  data() {
    return {
      usuario: '',
      password: '',
      errorMensaje: '',
      showOptions: false,
    };
  },
  computed: {
    loggedIn() {
      return useUserStore().user !== null;
    },
    username() {
      return useUserStore().user;
    },
  },
  methods: {
    async iniciarSesion() {
    try {
      // Realiza la solicitud POST al servidor
      const response = await useApiStore().loginuser(this.usuario, this.password);

      // Verifica si la respuesta es válida y contiene la propiedad 'data'
      if (response && response.data) {
        console.log("USU", response.data);
        let responseData = response.data;

        const userStore = useUserStore();
        userStore.loginUser({ user: this.usuario, password: this.password });

        localStorage.setItem('token', responseData.token);
        console.log('Token:', responseData.token);
        
        if (this.$route.path !== '/') {
          this.$router.push('/');
        }
      } else {
        console.error('Respuesta del servidor no válida:', response);
        // Puedes manejar este caso según tus necesidades, por ejemplo, mostrar un mensaje de error.
      }
    } catch (error) {
      if (error.response) {
        console.error('Respuesta del servidor con error:', error.response.data);
        this.errorMensaje = error.response.data.mensaje;
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor');
      } else {
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  },
    logout() {
      useUserStore().logout();
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
  }
};
</script>


<style>
.animated-button {
  position: relative;
  overflow: hidden;
}

.animated-button::before {
  content: "";
  position: absolute;
  background: linear-gradient(90deg, #1c74f1, #f12711, #ffcc00);
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: left 0.4s;
}

.animated-button:hover::before {
  left: 100%;
}


.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.separar{
  margin-top: 20px;
  
}

.navbar a,
.navbar-username {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  margin-right: 10px;
}

.options-container a,
.options-container span {
  margin-bottom: 10px;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.navbar-username {
  margin: 0 10px;
  position: relative;
}

.options-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}
</style>
