// src/routes/index.js
const express = require('express');
const router = express.Router();
const tareasController = require('./controllers/tareasController');
const usuariosController = require('./controllers/usuariosController');
const etiquetasController = require('./controllers/etiquetasController');
const comentariosController = require('./controllers/comentariosController');

// Rutas para las tareas 
router.post('/tareas', tareasController.crearTarea);
router.get('/tareas', tareasController.obtenerTareas);
router.get('/tareas/priorizadas', tareasController.obtenerTareasPriorizadas); // Nueva ruta para tareas priorizadas
router.put('/tareas/:id', tareasController.actualizarTarea);
router.delete('/tareas/:id', tareasController.eliminarTarea);

// Rutas de usuarios
router.post('/usuarios', usuariosController.crearUsuario);
router.get('/usuarios', usuariosController.obtenerUsuarios);

// Rutas de etiquetas
router.post('/etiquetas', etiquetasController.crearEtiqueta);
router.get('/etiquetas', etiquetasController.obtenerEtiquetas);

// Rutas de comentarios
router.post('/comentarios', comentariosController.crearComentario);
router.get('/comentarios', comentariosController.obtenerComentarios);

module.exports = router;
