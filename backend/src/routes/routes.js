// src/routes/routes.js
const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const etiquetasController = require('../controllers/etiquetasController');
const comentariosController = require('../controllers/comentariosController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de autenticación
router.post('/auth/register', authController.register); // Registro de usuarios
router.post('/auth/login', authController.login); // Inicio de sesión

// Rutas protegidas que requieren autenticación
router.get('/tareas', authMiddleware, tareasController.obtenerTareas);
router.post('/tareas', authMiddleware, tareasController.crearTarea);

// Otras rutas no protegidas
router.put('/tareas/:id', tareasController.actualizarTarea);
router.delete('/tareas/:id', tareasController.eliminarTarea);

// Rutas de usuarios (sin protección para el ejemplo)
router.get('/usuarios', usuariosController.obtenerUsuarios);

// Rutas de etiquetas
router.post('/etiquetas', authMiddleware, etiquetasController.crearEtiqueta);
router.get('/etiquetas', etiquetasController.obtenerEtiquetas);

// Rutas de comentarios
router.post('/comentarios', authMiddleware, comentariosController.crearComentario);
router.get('/comentarios', comentariosController.obtenerComentarios);

module.exports = router;
