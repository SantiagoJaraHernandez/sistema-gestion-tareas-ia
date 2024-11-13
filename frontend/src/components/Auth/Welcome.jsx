// src/components/Auth/Welcome.js
import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="p-8 rounded-lg shadow-lg text-center bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Bienvenido al Sistema de Gestión de Tareas
        </h1>
        <div className="space-y-4">
          <Link
            to="/login"
            className="block bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-6 py-2 rounded-md transition-all duration-200"
            aria-label="Iniciar Sesión"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="block bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white px-6 py-2 rounded-md transition-all duration-200"
            aria-label="Registrarse"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
