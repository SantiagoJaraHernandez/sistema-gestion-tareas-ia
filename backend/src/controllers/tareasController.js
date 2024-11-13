const pool = require('../database/db');

// Constantes para puntuación
const MAX_PUNTUACION = 100;
const IMPORTANCIA_MIN = 1;

// Middleware para manejo de errores centralizado
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Función para convertir texto en tiempo estimado (como "2 horas" a 2)
const convertirTiempoEstimado = (tiempo) => {
    if (!tiempo || typeof tiempo !== 'string') {
        console.error('Tiempo estimado no válido:', tiempo); // Log para saber si el valor no es válido
        return 0; // Retorna 0 si no es un string válido
    }

    const match = tiempo.match(/\d+(\.\d+)?/); // Buscar números, incluyendo decimales

    return match ? parseFloat(match[0]) : 0; // Retorna el número encontrado o 0 si no se encuentra ninguno
};

// Función para validar y convertir la importancia a un valor numérico dentro del rango 1-5
const obtenerImportancia = (importancia) => {
    const importanciaNum = parseInt(importancia, 10);
    return (!isNaN(importanciaNum) && importanciaNum >= 1 && importanciaNum <= 5) ? importanciaNum : 1;
};

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
const crearTarea = asyncHandler(async (req, res) => {
    const { titulo, descripcion, fecha_creacion, fecha_vencimiento, estado, importancia, tiempo_estimado } = req.body;
    const usuarioId = req.usuario.id; // Obtener el id del usuario desde el token (autenticación)

    // Validaciones antes de procesar los datos
    if (!titulo || !descripcion || !fecha_creacion || !fecha_vencimiento || !estado) {
        return res.status(400).json({ message: 'Faltan datos obligatorios en la solicitud.' });
    }

    // Convertir el valor de importancia a un número
    const importanciaNumerica = obtenerImportancia(importancia);

    // Convertir tiempo_estimado (por ejemplo "2 horas" a 2)
    const tiempoEstimadoNumerico = convertirTiempoEstimado(tiempo_estimado);

    if (tiempoEstimadoNumerico <= 0) {
        return res.status(400).json({ message: 'El tiempo estimado debe ser un valor positivo.' });
    }

    const result = await pool.query(
        'INSERT INTO tareas (usuario_id, titulo, descripcion, fecha_creacion, fecha_vencimiento, estado, importancia, tiempo_estimado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [usuarioId, titulo, descripcion, fecha_creacion, fecha_vencimiento, estado, importanciaNumerica, tiempoEstimadoNumerico]
    );

    res.status(201).json(result.rows[0]);
});

// Obtener todas las tareas del usuario
const obtenerTareas = asyncHandler(async (req, res) => {
    const usuarioId = req.usuario.id; // Obtén el ID del usuario desde el token

    const tareas = await pool.query('SELECT * FROM tareas WHERE usuario_id = $1', [usuarioId]);

    if (tareas.rows.length === 0) {
        return res.status(404).json({ message: 'No se encontraron tareas para este usuario.' });
    }

    res.status(200).json({ tareas: tareas.rows });
});

// Obtener tareas priorizadas del usuario
const obtenerTareasPriorizadas = asyncHandler(async (req, res) => {
    const usuarioId = req.usuario.id; // Obtener el ID del usuario desde el token

    // Obtener todas las tareas del usuario
    const result = await pool.query('SELECT * FROM tareas WHERE usuario_id = $1', [usuarioId]);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: 'No se encontraron tareas para este usuario.' });
    }

    // Priorizar tareas
    const tareasPriorizadas = priorizarTareas(result.rows);
    res.status(200).json(tareasPriorizadas); // Retornar las tareas priorizadas
});

// Actualizar solo el estado de una tarea
const actualizarTarea = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log('Cuerpo de la solicitud:', req.body);

    // Solo obtener el estado de la solicitud
    const { estado } = req.body;

    // Validación antes de la actualización
    if (!estado) {
        return res.status(400).json({ message: 'El estado es obligatorio en la solicitud.' });
    }

    // Realizar la actualización solo para el campo 'estado'
    const result = await pool.query(
        'UPDATE tareas SET estado = $1 WHERE id = $2 RETURNING *',
        [estado, id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(result.rows[0]); // Retornar la tarea actualizada
});

// Eliminar una tarea
const eliminarTarea = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json({ message: 'Tarea eliminada con éxito' });
});

module.exports = {
    crearTarea,
    obtenerTareas,
    obtenerTareasPriorizadas,
    actualizarTarea,
    eliminarTarea
};
