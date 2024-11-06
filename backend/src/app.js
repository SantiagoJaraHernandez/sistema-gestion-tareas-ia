require('dotenv').config();  // Cargar variables de entorno desde .env

const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');  // Actualiza esta ruta
const crearTablas = require('./database/setup');  // Actualiza esta ruta

const app = express();
const PORT = process.env.PORT || 5000;  // Usar la variable de entorno PORT

// Middleware
app.use(cors());  // Permitir solicitudes CORS
app.use(express.json());  // Parsear solicitudes JSON

// Rutas
app.use('/api', routes);

// Crear las tablas al iniciar el servidor
crearTablas();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
