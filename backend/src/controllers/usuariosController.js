// src/controllers/usuariosController.js
const pool = require('../database/db'); // Asegúrate de tener un archivo de conexión a la DB

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  try {
    const result = await pool.query('INSERT INTO usuarios (nombre, email, contrasena) VALUES ($1, $2, $3) RETURNING *', [nombre, email, contrasena]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

module.exports = { crearUsuario, obtenerUsuarios };
