// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.105:3000', // Reemplaza con la URL de tu servidor API
});

export default api;
