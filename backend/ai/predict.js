const { PythonShell } = require('python-shell');

// Función para predecir la prioridad usando el modelo entrenado
const predictPriority = (tiempo_estimado, importancia, dias_restantes) => {
    return new Promise((resolve, reject) => {
        const options = {
            mode: 'text',
            pythonPath: 'python',  // Asegúrate de que 'python' esté en el PATH
            pythonOptions: ['-u'],  // Para obtener la salida en tiempo real
            scriptPath: './ai',  // Ruta al script de Python
            args: [tiempo_estimado, importancia, dias_restantes],
            timeout: 120000  // Tiempo máximo para la ejecución (en milisegundos)
        };

        PythonShell.run('predict_priority.py', options, (err, results) => {
            if (err) {
                console.error('Error en Python:', err);  // Aquí capturamos el error completo
                reject(err); // Aquí imprimimos el error detallado
            } else {
                console.log('Resultados:', results); // Asegúrate de imprimir los resultados
                resolve(results);
            }
        });
    });
};

module.exports = {
    predictPriority
};
