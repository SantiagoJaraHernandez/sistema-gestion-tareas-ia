// src/components/TaskDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Fetch task by ID
    fetch(`/api/tareas/${id}`)
      .then((response) => response.json())
      .then((data) => setTask(data));
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{task.titulo}</h1>
      <p className="mb-4">{task.descripcion}</p>
      <p>
        Estado:{' '}
        <span className={task.completada ? 'text-green-500' : 'text-red-500'}>
          {task.completada ? 'Completada' : 'Pendiente'}
        </span>
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Editar Tarea</button>
    </div>
  );
};

export default TaskDetail;
