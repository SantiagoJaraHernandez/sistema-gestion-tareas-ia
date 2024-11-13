import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Las contraseñas no coinciden');
    }

    try {
      // Enviar petición de registro al backend
      const response = await axios.post('http://localhost:3000/api/auth/register', { 
        nombre: name, 
        email, 
        contrasena: password 
      });

      alert(response.data.message);  // Muestra el mensaje de éxito
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // Mostrar mensaje de error
        alert(error.response.data.message);
      } else {
        console.error('Error en el servidor', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
