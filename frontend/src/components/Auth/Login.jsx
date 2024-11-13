import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { 
        email, 
        contrasena: password 
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
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
        <h2 className="text-3xl font-bold text-gray-200 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
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
            className="mb-6 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded w-full"
          />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-500 transition-all duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
