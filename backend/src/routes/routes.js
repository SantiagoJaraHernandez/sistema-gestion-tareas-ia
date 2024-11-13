const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const etiquetasController = require('../controllers/etiquetasController');
const comentariosController = require('../controllers/comentariosController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de autenticación (públicas)
router.post('/auth/register', authController.register); // Registro de usuarios
router.post('/auth/login', authController.login); // Inicio de sesión

// Rutas protegidas que requieren autenticación
router.get('/tareas', authMiddleware, tareasController.obtenerTareas);
router.post('/tareas', authMiddleware, tareasController.crearTarea);
router.get('/tareas/priorizadas', authMiddleware, tareasController.obtenerTareasPriorizadas); // Tareas priorizadas
router.put('/tareas/:id', authMiddleware, tareasController.actualizarTarea); // Protección añadida
router.delete('/tareas/:id', authMiddleware, tareasController.eliminarTarea); // Protección añadida

// Rutas de usuarios (puedes proteger si no debe ser pública)
router.get('/usuarios', authMiddleware, usuariosController.obtenerUsuarios); // Protección añadida
router.get('/usuarios/me', authMiddleware, usuariosController.obtenerUsuarioAutenticado); // Obtener usuario autenticado
router.get('/usuarios/:id', authMiddleware, usuariosController.obtenerUsuario); // Obtener un usuario por ID
router.post('/usuarios', usuariosController.crearUsuario);

// Rutas de etiquetas
router.post('/etiquetas', authMiddleware, etiquetasController.crearEtiqueta); // Proteger la creación de etiquetas
router.get('/etiquetas', authMiddleware, etiquetasController.obtenerEtiquetas); // Protección añadida para obtener etiquetas

// Rutas de comentarios
router.post('/comentarios', authMiddleware, comentariosController.crearComentario); // Proteger la creación de comentarios
router.get('/comentarios', authMiddleware, comentariosController.obtenerComentarios); // Protección añadida para obtener comentarios

module.exports = router;
