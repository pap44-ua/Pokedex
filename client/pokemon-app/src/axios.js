// src/axios.js
import axios from 'axios';

// Configuración de la instancia de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  console.log('Making request to: ', config.url);
  return config;
});

apiClient.interceptors.response.use((response) => {
  console.log('Received response: ', response);
  return response;
}, (error) => {
  console.error('Request failed with error: ', error);
  return Promise.reject(error);
});

export default apiClient;
