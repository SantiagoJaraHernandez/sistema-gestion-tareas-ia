import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [tareas, setTareas] = useState([]);
  const [tareasPriorizadas, setTareasPriorizadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState('');
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    const fetchUsuario = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/usuarios/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(response.data.nombre);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    const fetchTareas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tareas', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTareas(response.data.tareas);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
      }
    };

    const fetchTareasPriorizadas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tareas/priorizadas', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTareasPriorizadas(response.data);
      } catch (error) {
        console.error('Error al obtener tareas priorizadas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
    fetchTareas();
    fetchTareasPriorizadas();
  }, [navigate]);

  const filteredTareas = tareas.filter((tarea) => {
    const matchesSearch = tarea.titulo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tarea.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTareasPriorizadas = tareasPriorizadas.filter((tarea) => {
    const matchesSearch = tarea.titulo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tarea.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const actualizarTarea = async (tareaId, nuevoEstado) => {
    try {
      await axios.put(`http://localhost:3000/api/tareas/${tareaId}`, { estado: nuevoEstado }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTareas(tareas.map(tarea =>
        tarea.id === tareaId ? { ...tarea, estado: nuevoEstado } : tarea
      ));
      setTareasPriorizadas(tareasPriorizadas.map(tarea =>
        tarea.id === tareaId ? { ...tarea, estado: nuevoEstado } : tarea
      ));
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const eliminarTarea = async (tareaId) => {
    try {
      await axios.delete(`http://localhost:3000/api/tareas/${tareaId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTareas(tareas.filter(tarea => tarea.id !== tareaId));
      setTareasPriorizadas(tareasPriorizadas.filter(tarea => tarea.id !== tareaId));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  if (loading) return <div className="text-center text-gray-400">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-0">
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-200">Bienvenido, {usuario}</h1>
          </div>

          <div className="flex justify-between mb-6">
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Tareas del Usuario</h2>
            {filteredTareas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTareas.map((tarea) => (
                  <div
                    key={tarea.id}
                    className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <h3 className="font-bold text-xl text-gray-200">{tarea.titulo}</h3>
                    <p className="text-sm text-gray-400">{tarea.descripcion}</p>
                    <p className="text-sm text-gray-400">Fecha de Vencimiento: {new Date(tarea.fecha_vencimiento).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-400">Estado: {tarea.estado}</p>
                    <div className="mt-4 flex space-x-2">
                      <button
                        className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-500"
                        onClick={() => actualizarTarea(tarea.id, tarea.estado === 'pendiente' ? 'completada' : 'pendiente')}
                      >
                        {tarea.estado === 'pendiente' ? 'Marcar como Completada' : 'Marcar como Pendiente'}
                      </button>
                      <button
                        className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-500"
                        onClick={() => eliminarTarea(tarea.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No se encontraron tareas.</p>
            )}
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Listado de tareas segun su orden de prioridad</h2>
            {filteredTareasPriorizadas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTareasPriorizadas
                  .filter(tarea => tarea.estado === 'pendiente')  /* Solo las pendientes con alta prioridad */
                  .map((tarea, index) => (
                    <div
                      key={tarea.id}
                      className={`bg-gray-700 p-6 rounded-lg shadow-md ${index === 0 ? 'border-4 border-yellow-500' : ''} hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      <h3 className="font-bold text-xl text-gray-200">{tarea.titulo}</h3>
                      <p className="text-sm text-gray-400">{tarea.descripcion}</p>
                      <p className="text-sm text-gray-400">Fecha de Vencimiento: {new Date(tarea.fecha_vencimiento).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-400">Estado: {tarea.estado}</p>
                      {index === 0 && (
                        <div className="mt-2 bg-yellow-500 text-gray-900 text-xs p-1 rounded-full">
                          <span>¡Realizar lo más pronto posible!</span>
                        </div>
                      )}
                      <div className="mt-4 flex space-x-2">
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-400">No se encontraron tareas prioritarias.</p>
            )}
            
          </section>
          
          {/* Botón para redirigir a CreateTaskForm */}
          <button
            onClick={() => navigate('/tareas/nueva')}
            className="fixed bottom-8 right-8 bg-green-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-500 transition-all duration-300"
          >
            + Crear Tarea
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
