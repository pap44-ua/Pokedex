const sqlite3 = require('sqlite3').verbose();
const jwt = require('jwt-simple');
const bodyParser = require('body-parser'); //Creo que no hace falta
const express = require('express');


const app = express();


app.use(bodyParser.json());


const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';

const db = new sqlite3.Database('./pokemon.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});



// Función controladora para buscar un Pokémon por Nombre o Número de Pokédex
function buscarPokemon(req, res) {
  const { nombreOId } = req.params;
  const sql = 'SELECT * FROM pokemon WHERE nombre = ? OR numeroPokedex = ?';

  if (nombreOId < 0) {
    return res.status(500).json({ error: 'ID NO VALIDO' });
  }

  db.get(sql, [nombreOId, nombreOId], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (row) {
      res.status(200).json(row);
    } else {
      // Si el Pokémon no se encuentra, envía una respuesta con estado 404
      res.status(404).json({ error: 'Pokémon no encontrado UWU' });
    }
  });
}

//Obtener un pokemon aleatorio
function obtenerPokemonAleatorio(req, res) {
  db.get('SELECT * FROM pokemon ORDER BY RANDOM() LIMIT 1', (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al obtener un Pokémon aleatorio' });
      return;
    }

    if (row) {
      // Devuelve directamente las características del Pokémon
      res.json({
        nombre: row.nombre,
        numeroPokedex: row.numeroPokedex,
        pS: row.pS,
        atk: row.atk,
        def: row.def,
        SpAtk: row.SpAtk,
        SpDef: row.SpDef,
        Spe: row.Spe,
        tipo1: row.tipo1,
        tipo2: row.tipo2,
        evolucion: row.evolucion,
        habilidad: row.habilidad
      });
    } else {
      res.status(404).json({ error: 'No se encontraron Pokémon en la base de datos' });
    }
  });
}

function detallesEvolucion(req, res) {
  const { nombreOId } = req.params;

  const sql = `
  SELECT
  p.nombre AS nombre_pokemon,
  e.nombre AS nombre_evolucion,
  e.numeroPokedex,
  e.pS,
  e.atk,
  e.def,
  e.SpAtk,
  e.SpDef,
  e.Spe,
  e.tipo1,
  e.tipo2,
  e.descripcion
  FROM pokemon AS p
  LEFT JOIN pokemon AS e ON p.evolucion = e.numeroPokedex
  WHERE p.numeroPokedex = ? OR p.nombre = ?;
    `;


  db.get(sql, [nombreOId, nombreOId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al obtener los detalles de la evolución del Pokémon' });
      return;
    }

    if (row) {
      const detallesEvolucion = row
      if (detallesEvolucion.nombre = null) {
        res.status(500).json({ error: 'No hay evolucion para este pokemon' });
      }
      res.json(detallesEvolucion);
    } else {
      res.status(404).json({ error: 'No se encontraron detalles de la evolución del Pokémon' });
    }
  });

}

function filtrarPorTipo(req, res) {
  const { tipo } = req.params;
  const { page = 1, per_page = 10 } = req.query;
  const offset = (page - 1) * per_page;
  const sql = `
    SELECT nombre, numeroPokedex, pS, atk, def, SpAtk, SpDef, Spe, tipo1, tipo2, evolucion, habilidad
    FROM pokemon
    WHERE tipo1 LIKE ? OR tipo2 LIKE ?
    LIMIT ? OFFSET ?;
  `;

  db.all(sql, [`%${tipo}%`, `%${tipo}%`, parseInt(per_page), parseInt(offset)], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al filtrar Pokémon por tipo' });
      return;
    }

    if (rows.length > 0) {
      const pokemonsFiltrados = rows.map(row => ({
        nombre: row.nombre,
        numeroPokedex: row.numeroPokedex,
        pS: row.pS,
        atk: row.atk,
        def: row.def,
        SpAtk: row.SpAtk,
        SpDef: row.SpDef,
        Spe: row.Spe,
        tipo1: row.tipo1,
        tipo2: row.tipo2,
        evolucion: row.evolucion,
        habilidad: row.habilidad
      }));
      res.json({
        page: parseInt(page),
        per_page: parseInt(per_page),
        total_results: rows.length,
        pokemons: pokemonsFiltrados
      });
    } else {
      res.status(404).json({ error: 'No se encontraron Pokémon con el tipo especificado' });
    }
  });
}


function verPerfilModerador(req, res) {
  const Usuario = req.params.usuario;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }
  let moderadorInfo;
  try {
    moderadorInfo = jwt.decode(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  if (moderadorInfo.Usuario !== Usuario) {
    return res.status(403).json({ error: 'No tienes permiso para ver este perfil' });
  }

  const sql = 'SELECT Usuario, Nombre, email FROM Moderador WHERE Usuario = ?';

  db.get(sql, [Usuario], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al obtener el perfil del moderador' });
    }

    if (row) {
      res.json({
        Usuario: row.Usuario,
        Nombre: row.Nombre,
        email: row.email,
      });
    } else {
      res.status(404).json({ error: 'Moderador no encontrado' });
    }
  });
}


function iniciarSesionModerador(req, res) {
  const { Usuario, Contrasena } = req.body;
  const db = new sqlite3.Database('./pokemon.db', (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    const sql = 'SELECT * FROM Moderador WHERE Usuario = ? AND Contrasena = ?';
    db.get(sql, [Usuario, Contrasena], (err, row) => {
      if (err) {
        db.close();
        return res.status(500).json({ error: 'Error en la base de datos' });
      }

      if (row) {
        const tokenPayload = {
          Usuario: row.Usuario,
          Contrasena: row.Contrasena
        };

        const token = jwt.encode(tokenPayload, JWT_SECRET, 'HS512');
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      db.close();
    });
  });
}


function crearPokemon(req, res) {
  const token = req.headers.authorization;
  let moderadorInfo;

  if (!token) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }

  try {
    moderadorInfo = jwt.decode(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  const nuevoPokemon = req.body;

  console.log(nuevoPokemon);

  const sql = `
      INSERT INTO pokemon (nombre, pS, atk, def, SpAtk, SpDef, Spe, tipo1, tipo2, evolucion, descripcion, habilidad)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
    `;

  const values = [
    nuevoPokemon.nombre,
    nuevoPokemon.pS,
    nuevoPokemon.atk,
    nuevoPokemon.def,
    nuevoPokemon.SpAtk,
    nuevoPokemon.SpDef,
    nuevoPokemon.Spe,
    nuevoPokemon.tipo1,
    nuevoPokemon.tipo2,
    nuevoPokemon.evolucion,
    nuevoPokemon.descripcion,
    nuevoPokemon.habilidad
  ];
  console.log(values);

  db.run(sql, values, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al crear el Pokémon' });
    }

    res.status(201).json({ message: 'Pokémon creado con éxito' });
  });
}

function actualizarPokemon(req, res) {
  const token = req.headers.authorization;
  let moderadorInfo;

  if (!token) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }

  try {
    moderadorInfo = jwt.decode(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  const numeroPokedexStr = req.params.nombreOId;
  const numeroPokedex = parseInt(numeroPokedexStr);

  if (isNaN(numeroPokedex)) {
    return res.status(400).json({ error: 'Número de Pokédex no válido' });
  }
  const datosActualizados = req.body;
  const sql = `
      UPDATE pokemon
      SET nombre = ?,
          pS = ?,
          atk = ?,
          def = ?,
          SpAtk = ?,
          SpDef = ?,
          Spe = ?,
          tipo1 = ?,
          tipo2 = ?,
          evolucion = ?,
          descripcion = ?,
          habilidad = ?
      WHERE numeroPokedex = ?;
    `;

  const values = [
    datosActualizados.nombre,
    datosActualizados.pS,
    datosActualizados.atk,
    datosActualizados.def,
    datosActualizados.SpAtk,
    datosActualizados.SpDef,
    datosActualizados.Spe,
    datosActualizados.tipo1,
    datosActualizados.tipo2,
    datosActualizados.evolucion,
    datosActualizados.descripcion,
    datosActualizados.habilidad,
    numeroPokedex
  ];
  console.log(numeroPokedex);
  console.log(values);
  db.run(sql, values, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al actualizar el Pokémon' });
    }

    res.status(200).json({ message: 'Pokémon actualizado con éxito' });
  });
}

function borrarPokemon(req, res) {
  const token = req.headers.authorization;
  let moderadorInfo;

  if (!token) {
    return res.status(401).json({ error: 'No estás autenticado' });
  }

  try {
    moderadorInfo = jwt.decode(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  const numeroPokedexStr = req.params.nombreOId;
  const numeroPokedex = parseInt(numeroPokedexStr);

  if (isNaN(numeroPokedex)) {
    return res.status(400).json({ error: 'Número de Pokédex no válido' });
  }

  const sql = 'DELETE FROM pokemon WHERE numeroPokedex = ?';

  db.run(sql, [numeroPokedex], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al borrar el Pokémon' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }

    res.status(200).json({ message: 'Pokémon borrado con éxito' });
  });
}

function obtenerTodosLosPokemons(req, res) {
  const sql = 'SELECT * FROM pokemon';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al obtener todos los Pokémon de la base de datos' });
      return;
    }

    if (rows.length > 0) {
      const todosLosPokemons = rows.map(row => ({
        nombre: row.nombre,
        numeroPokedex: row.numeroPokedex,
        pS: row.pS,
        atk: row.atk,
        def: row.def,
        SpAtk: row.SpAtk,
        SpDef: row.SpDef,
        Spe: row.Spe,
        tipo1: row.tipo1,
        tipo2: row.tipo2,
        evolucion: row.evolucion,
        habilidad: row.habilidad
      }));
      res.json(todosLosPokemons);
    } else {
      res.status(404).json({ error: 'No se encontraron Pokémon en la base de datos' });
    }
  });
}

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Conexión a la base de datos cerrada.');
    }
    process.exit();
  });
});

module.exports = {
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

};
