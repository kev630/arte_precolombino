import { pool } from '../config/db.js';

// Obtener todos los tamaños
export const obtenerTamanios = async () => {
  const [rows] = await pool.query('SELECT * FROM tamanio');
  return rows;
};

// Insertar un nuevo tamaño
export const insertarTamanio = async (tamanio) => {
  await pool.query('INSERT INTO tamanio (tamanio) VALUES (?)', [tamanio]);
};

// Eliminar un tamaño por ID (opcional)
export const eliminarTamanioPorId = async (id) => {
  const [result] = await pool.query('DELETE FROM tamanio WHERE tamanio_id = ?', [id]);
  return result;
};