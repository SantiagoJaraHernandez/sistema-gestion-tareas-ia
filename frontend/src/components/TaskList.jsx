// src/components/TaskList.js
import React, { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch all tasks from the API
    fetch('/api/tareas')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="px-4 py-2">{task.titulo}</td>
              <td className="px-4 py-2">{task.descripcion}</td>
              <td className="px-4 py-2">
                {task.completada ? 'Completada' : 'Pendiente'}
              </td>
              <td className="px-4 py-2">
                {/* Acciones como editar o eliminar */}
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Editar</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
