const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No se proporcionó el token' });
  }

  // El token está después de "Bearer " en el encabezado
  const token = authHeader.split(' ')[1]; // Extraer solo el token

  if (!token) {
    return res.status(401).json({ message: 'Token mal formado o no presente' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Se agregan los datos decodificados (incluyendo email) a la request

    // Ahora, puedes acceder a req.usuario.email en tus controladores.
    next(); // Procede a la siguiente función en la ruta
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido o ha expirado' });
  }
};

module.exports = authMiddleware;
