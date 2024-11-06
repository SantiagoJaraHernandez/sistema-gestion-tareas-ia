// src/controllers/comentariosController.js
const pool = require('../database/db');


const crearComentario = async (req, res) => {
  const { tarea_id, usuario_id, comentario } = req.body;
  try {
    const result = await pool.query('INSERT INTO comentarios (tarea_id, usuario_id, comentario) VALUES ($1, $2, $3) RETURNING *', [tarea_id, usuario_id, comentario]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear comentario' });
  }
};

const obtenerComentarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comentarios');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};

module.exports = { crearComentario, obtenerComentarios };
