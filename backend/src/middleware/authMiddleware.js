// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó el token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Datos del usuario se agregan a la request
    next(); // Procede a la siguiente función en la ruta
  } catch (error) {
    res.status(401).json({ message: 'Token no válido o ha expirado' });
  }
};

module.exports = authMiddleware;
