// src/controllers/etiquetasController.js
const pool = require('../database/db');


const crearEtiqueta = async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await pool.query('INSERT INTO etiquetas (nombre) VALUES ($1) RETURNING *', [nombre]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear etiqueta' });
  }
};

const obtenerEtiquetas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM etiquetas');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener etiquetas' });
  }
};

module.exports = { crearEtiqueta, obtenerEtiquetas };
