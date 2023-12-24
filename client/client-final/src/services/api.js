// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.15:3000', // Reemplaza con la URL de tu servidor API
});

export default api;
