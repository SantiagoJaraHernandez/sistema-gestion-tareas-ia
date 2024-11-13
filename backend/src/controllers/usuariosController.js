const pool = require('../database/db'); // Asegúrate de tener un archivo de conexión a la DB

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  try {
    const result = await pool.query('INSERT INTO usuarios (nombre, email, contrasena) VALUES ($1, $2, $3) RETURNING *', [nombre, email, contrasena]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por su id
const obtenerUsuario = async (req, res) => {
  const { id } = req.params; // Usando el id en la URL como parámetro
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Obtener un usuario por su email
const obtenerUsuarioPorEmail = async (req, res) => {
  const { email } = req.params; // Usamos el email en la URL como parámetro
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Obtener el usuario autenticado
const obtenerUsuarioAutenticado = async (req, res) => {
  const { email } = req.usuario; // Accediendo al 'email' desde req.usuario

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};


// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contrasena } = req.body;

  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, email = $2, contrasena = $3 WHERE id = $4 RETURNING *',
      [nombre, email, contrasena, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  obtenerUsuarioPorEmail,
  obtenerUsuarioAutenticado,
  actualizarUsuario,
  eliminarUsuario
};
