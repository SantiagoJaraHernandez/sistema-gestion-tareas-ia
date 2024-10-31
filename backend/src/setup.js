// src/setup.js
const { Pool } = require('pg'); // Importar Pool para manejar la conexión a PostgreSQL
require('dotenv').config(); // Cargar variables de entorno

// Crear una nueva instancia de Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Función para crear las tablas
const crearTablas = async () => {
  const queryUsuarios = `
    CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        contrasena VARCHAR(100) NOT NULL
    );`;

  const queryTareas = `
    CREATE TABLE IF NOT EXISTS tareas (
        id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL,
        titulo VARCHAR(200) NOT NULL,
        descripcion TEXT,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_vencimiento TIMESTAMP,
        estado VARCHAR(50) DEFAULT 'pendiente',
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );`;

  const queryEtiquetas = `
    CREATE TABLE IF NOT EXISTS etiquetas (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) UNIQUE NOT NULL
    );`;

  const queryComentarios = `
    CREATE TABLE IF NOT EXISTS comentarios (
        id SERIAL PRIMARY KEY,
        tarea_id INT NOT NULL,
        usuario_id INT NOT NULL,
        comentario TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tarea_id) REFERENCES tareas(id) ON DELETE CASCADE,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );`;

  try {
    await pool.query(queryUsuarios);
    await pool.query(queryTareas);
    await pool.query(queryEtiquetas);
    await pool.query(queryComentarios);
    console.log('Tablas creadas correctamente');
  } catch (error) {
    console.error('Error al crear tablas:', error);
  } finally {
    await pool.end(); // Cerrar la conexión al finalizar
  }
};

// Exportar la función para su uso en index.js
module.exports = crearTablas;
