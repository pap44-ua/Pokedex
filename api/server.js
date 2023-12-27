const express = require('express');
//const multer = require('multer');
const app = express();
const cors = require('cors');
const port = 3000; 

app.use(express.json());
app.use(cors());

const {
  buscarPokemon,
  obtenerPokemonAleatorio,
  detallesEvolucion,
  filtrarPorTipo,
  verPerfilModerador,
  iniciarSesionModerador,
  crearPokemon,
  actualizarPokemon,
  borrarPokemon,
  obtenerTodosLosPokemons
} = require('./controladores');


// Ruta para buscar un Pokémon por Nombre o Número de Pokédex
app.get('/pokemon/buscar/:nombreOId', buscarPokemon);

// Ruta para obtener un Pokémon aleatorio
app.get('/pokemon/random', obtenerPokemonAleatorio);

//Ruta para obtener todos los pokemons
app.get('/pokemon', obtenerTodosLosPokemons);

// Ruta para obtener detalles de evolución de un Pokémon específico
app.get('/pokemon/:nombreOId/evolucion', detallesEvolucion);

// Ruta para filtrar Pokémon por tipo
app.get('/pokemon/tipo/:tipo', filtrarPorTipo);

// Ruta para ver el perfil del moderador
app.get('/moderador/ver/:usuario', verPerfilModerador);

// Ruta para iniciar sesión del moderador
app.post('/moderador/login', iniciarSesionModerador);

// Ruta para crear un nuevo Pokémon 
app.post('/pokemon/crear', crearPokemon);

// Ruta para actualizar un Pokémon existente 
app.put('/pokemon/actualizar/:nombreOId', actualizarPokemon);

// Ruta para borrar un Pokémon 
app.delete('/pokemon/borrar/:nombreOId', borrarPokemon);

const ip = '192.168.1.105'
app.listen(port,ip, () => {
  console.log(`Servidor en ejecución en el puerto ${port} y ip ${ip}`);
});
