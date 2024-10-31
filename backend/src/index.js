require('dotenv').config();  // Cargar variables de entorno desde .env

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');  // Importar Pool para manejar la conexión a PostgreSQL
const routes = require('./routes');  // Importar rutas

const app = express();
const PORT = process.env.PORT || 5000;  // Usar la variable de entorno PORT

// Middleware
app.use(cors());  // Permitir solicitudes CORS
app.use(express.json());  // Parsear solicitudes JSON

// Conexión a la base de datos usando las variables de entorno
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Rutas
app.use('/api', routes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
