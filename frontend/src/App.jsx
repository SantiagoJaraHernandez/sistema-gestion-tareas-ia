// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Welcome from './components/Auth/Welcome';
import ProtectedRoute from './components/ProtectedRoute';
import CreateTaskForm from './components/CreateTaskForm';

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tareas" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
          <Route path="/tareas/nueva" element={<ProtectedRoute><CreateTaskForm /></ProtectedRoute>} />
          <Route path="/tareas/:id" element={<ProtectedRoute><TaskDetail /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
