// src/services/taskService.js
const API_URL = "http://localhost:3000/api/tareas"; // Cambia según tu backend

export const getAllTasks = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

export const getTask = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

export const createTask = async (task) => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  return await response.json();
};

export const updateTask = async (id, task) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  return await response.json();
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};
