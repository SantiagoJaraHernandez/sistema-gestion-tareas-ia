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
      const response = await axios.post('http://localhost:3000/api/auth/register', { 
        nombre: name, 
        email, 
        contrasena: password 
      });

      alert(response.data.message);  
      navigate('/login');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error('Error en el servidor', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-200 mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded w-full"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-6 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded w-full"
          />
          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md w-full hover:bg-green-500 transition-all duration-300">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
