// src/components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ existingTask }) => {
  const [title, setTitle] = useState(existingTask ? existingTask.titulo : '');
  const [description, setDescription] = useState(existingTask ? existingTask.descripcion : '');
  const [completed, setCompleted] = useState(existingTask ? existingTask.completada : false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const taskData = { title, description, completed };

    if (existingTask) {
      // Update existing task
      fetch(`/api/tareas/${existingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
    } else {
      // Create new task
      fetch('/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700">Título</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Descripción</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <span className="ml-2">Completada</span>
        </label>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {existingTask ? 'Actualizar Tarea' : 'Crear Tarea'}
      </button>
    </form>
  );
};

export default TaskForm;
