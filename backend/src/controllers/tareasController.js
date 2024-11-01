// src/controllers/tareasController.js
const pool = require('../db'); // Asegúrate de tener un archivo de conexión a la DB

// Constantes para puntuación
const MAX_PUNTUACION = 100;
const IMPORTANCIA_MIN = 0;

// Función para calcular la puntuación de cada tarea
const calcularPuntuacion = (fecha_vencimiento, importancia, tiempo_estimado) => {
    const tiempoRestante = new Date(fecha_vencimiento) - new Date();
    const diasRestantes = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24)); // Convertir milisegundos a días

    // Penalización por tiempo estimado
    const penalizacionPorTiempo = Math.max(0, MAX_PUNTUACION - (tiempo_estimado * 20)); // Ajustado para ser más estricto

    // Prioridad basada en la urgencia
    const prioridadPorUrgencia = diasRestantes >= 0 ? 
        Math.max(0, MAX_PUNTUACION - (diasRestantes * 10)) : 
        0; // Penalización total si ya ha pasado la fecha de vencimiento

    // Importancia
    const puntuacionImportancia = Math.min(importancia || IMPORTANCIA_MIN, MAX_PUNTUACION); // Asegúrate de que no exceda el máximo

    // Calcular la puntuación total
    const puntuacionTotal = penalizacionPorTiempo + prioridadPorUrgencia + puntuacionImportancia;

    return Math.min(MAX_PUNTUACION, puntuacionTotal); // Limitar la puntuación a un máximo de 100
};


// Algoritmo de priorización
const priorizarTareas = (tareas) => {
    return tareas
        .map(tarea => {
            const { fecha_vencimiento, importancia, tiempo_estimado } = tarea;
            
            // Validación básica de los valores
            if (typeof importancia !== 'number' || importancia < 1 || importancia > 5) {
                console.warn(`Importancia no válida para la tarea: ${tarea.titulo}`);
                return { ...tarea, puntuacion: 0 }; // O asignar un valor predeterminado
            }

            if (isNaN(tiempo_estimado) || tiempo_estimado <= 0) {
                console.warn(`Tiempo estimado no válido para la tarea: ${tarea.titulo}`);
                return { ...tarea, puntuacion: 0 }; // O asignar un valor predeterminado
            }

            const puntuacion = calcularPuntuacion(fecha_vencimiento, importancia, parseFloat(tiempo_estimado));
            return { ...tarea, puntuacion };
        })
        .sort((a, b) => b.puntuacion - a.puntuacion); // Ordena de mayor a menor puntuación
};


// Crear una nueva tarea
const crearTarea = async (req, res) => {
    const { usuario_id, titulo, descripcion, fecha_creacion, fecha_vencimiento, estado, importancia, tiempo_estimado } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tareas (usuario_id, titulo, descripcion, fecha_creacion, fecha_vencimiento, estado, importancia, tiempo_estimado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [usuario_id, titulo, descripcion, fecha_creacion, fecha_vencimiento, estado, importancia, tiempo_estimado]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear tarea: ' + error.message });
    }
};

// Obtener todas las tareas
const obtenerTareas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tareas');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tareas: ' + error.message });
    }
};

// Obtener tareas priorizadas
const obtenerTareasPriorizadas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tareas');
        const tareasPriorizadas = priorizarTareas(result.rows);
        res.status(200).json(tareasPriorizadas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tareas priorizadas: ' + error.message });
    }
};

// Actualizar una tarea
const actualizarTarea = async (req, res) => {
    const { id } = req.params;
    const { usuario_id, titulo, descripcion, fecha_creacion, fecha_vencimiento, estado, importancia, tiempo_estimado } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tareas SET usuario_id = $1, titulo = $2, descripcion = $3, fecha_creacion = $4, fecha_vencimiento = $5, estado = $6, importancia = $7, tiempo_estimado = $8 WHERE id = $9 RETURNING *',
            [usuario_id, titulo, descripcion, fecha_creacion, fecha_vencimiento, estado, importancia, tiempo_estimado, id]
        );

        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar tarea: ' + error.message });
    }
};

// Eliminar una tarea
const eliminarTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount > 0) {
            res.status(200).json({ mensaje: 'Tarea eliminada' });
        } else {
            res.status(404).json({ error: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar tarea: ' + error.message });
    }
};

module.exports = { 
    crearTarea, 
    obtenerTareas, 
    obtenerTareasPriorizadas, // Exportar la nueva función
    actualizarTarea, 
    eliminarTarea 
};
