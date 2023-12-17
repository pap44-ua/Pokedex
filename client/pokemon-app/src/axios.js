// src/axios.js
import axios from 'axios';

// Configuración de la instancia de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Reemplaza con la dirección y puerto correctos de tu API
  headers: {
    'Content-Type': 'application/json',
    // Puedes agregar encabezados adicionales según sea necesario
  },
});

export default apiClient;
