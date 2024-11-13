import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const CreateTaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha_vencimiento: '',
    prioridad: 'baja',
    estado: 'pendiente',  // Valor por defecto para el estado
    tiempo_estimado: '',  // Tiempo estimado en horas o minutos
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); // Inicializar useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Crear la fecha de creación automáticamente como la fecha actual
    const fecha_creacion = new Date().toISOString();

    const requestData = {
      ...formData,
      fecha_creacion,  // Incluir la fecha de creación
    };

    try {
      const response = await axios.post('http://localhost:3000/api/tareas', requestData, {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      setSuccess(true);
      setFormData({
        titulo: '',
        descripcion: '',
        fecha_vencimiento: '',
        prioridad: 'baja',
        estado: 'pendiente',
        tiempo_estimado: '',
      });
      
      if (onTaskCreated) {
        onTaskCreated(response.data);
      }

      // Redirigir al dashboard después de crear la tarea
      navigate('/dashboard'); // Cambia '/dashboard' por la ruta que corresponda en tu aplicación

    } catch (error) {
      setError(error.response?.data?.message || 'Error al crear la tarea');
    }
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">Crear Nueva Tarea</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-200 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-200 focus:outline-none focus:border-blue-500"
            rows="3"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Fecha de Vencimiento</label>
            <input
              type="date"
              name="fecha_vencimiento"
              value={formData.fecha_vencimiento}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Prioridad</label>
            <select
              name="prioridad"
              value={formData.prioridad}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-200 focus:outline-none focus:border-blue-500"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tiempo Estimado (en horas)</label>
            <input
              type="number"
              name="tiempo_estimado"
              value={formData.tiempo_estimado}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        {error && (
          <div className="p-4 mb-4 text-sm text-white bg-red-600 rounded-lg">{error}</div>
        )}

        {success && (
          <div className="p-4 mb-4 text-sm text-white bg-green-600 rounded-lg">
            Tarea creada exitosamente
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-300"
        >
          Crear Tarea
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
