const express = require('express');
const router = express.Router();
const Tarea = require('./models/Tarea');

// Crear tarea
router.post('/tareas', async (req, res) => {
    const { titulo, descripcion, fecha_entrega, importancia, estimacion_tiempo } = req.body;
    try {
        const nuevaTarea = await Tarea.create({
            titulo,
            descripcion,
            fecha_entrega,
            importancia,
            estimacion_tiempo
        });
        res.json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ error: 'Error creando la tarea' });
    }
});

// Obtener todas las tareas
router.get('/tareas', async (req, res) => {
    try {
        const tareas = await Tarea.findAll();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo tareas' });
    }
});

// Editar tarea
router.put('/tareas/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha_entrega, importancia, estimacion_tiempo } = req.body;
    try {
        const tarea = await Tarea.findByPk(id);
        if (tarea) {
            tarea.titulo = titulo;
            tarea.descripcion = descripcion;
            tarea.fecha_entrega = fecha_entrega;
            tarea.importancia = importancia;
            tarea.estimacion_tiempo = estimacion_tiempo;
            await tarea.save();
            res.json(tarea);
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando tarea' });
    }
});

// Eliminar tarea
router.delete('/tareas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await Tarea.findByPk(id);
        if (tarea) {
            await tarea.destroy();
            res.json({ mensaje: 'Tarea eliminada' });
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando tarea' });
    }
});

module.exports = router;
