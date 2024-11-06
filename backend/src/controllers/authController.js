// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database/db'); // Conexión a la base de datos

// Registro de usuario
const register = async (req, res) => {
  const { nombre, email, contrasena } = req.body;

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar nuevo usuario
    const nuevoUsuario = await pool.query(
      'INSERT INTO usuarios (nombre, email, contrasena) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (usuario.rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const passwordValida = await bcrypt.compare(contrasena, usuario.rows[0].contrasena);
    if (!passwordValida) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: usuario.rows[0].id, email: usuario.rows[0].email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Verificar token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Almacenar datos del usuario en req
    next(); // Continuar con la solicitud
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }
};

module.exports = {
  register,
  login,
  verificarToken,
};
