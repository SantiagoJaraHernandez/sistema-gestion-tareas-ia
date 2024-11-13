// src/components/Auth/Welcome.js
import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al Sistema de Gestión de Tareas</h1>
        <Link to="/login" className="block bg-blue-500 text-white px-4 py-2 rounded mb-4">Iniciar Sesión</Link>
        <Link to="/register" className="block bg-green-500 text-white px-4 py-2 rounded">Registrarse</Link>
      </div>
    </div>
  );
};

export default Welcome;
