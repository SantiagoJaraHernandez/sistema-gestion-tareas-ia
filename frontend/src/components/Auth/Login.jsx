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
      // Enviar petición al backend para login
      const response = await axios.post('http://localhost:3000/api/auth/login', { 
        email, 
        contrasena: password 
      });

      // Si el login es exitoso, almacenamos el token
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
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
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
