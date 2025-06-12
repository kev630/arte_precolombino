import { pool } from '../config/db.js';

// Obtener todos los usuarios (solo para admin)
export const listarUsuarios = async (req, res) => {
  try {
    const [usuarios] = await pool.query(
      'SELECT usuario_id, nombre, apellido, correo, id_rol FROM usuarios'
    );
    res.json(usuarios);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Cambiar el rol de un usuario
export const cambiarRolUsuario = async (req, res) => {
  const { usuario_id, nuevo_rol } = req.body;

  if (!usuario_id || !nuevo_rol) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE usuarios SET id_rol = ? WHERE usuario_id = ?',
      [nuevo_rol, usuario_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Rol actualizado correctamente' });
  } catch (error) {
    console.error('Error al cambiar rol:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};