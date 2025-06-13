import { pool } from '../config/db.js';

// Obtener todas las culturas
export const obtenerCulturas = async () => {
  const [rows] = await pool.query('SELECT * FROM cultura');
  return rows;
};

// Insertar una nueva cultura
export const insertarCultura = async (cultura) => {
  await pool.query('INSERT INTO cultura (cultura) VALUES (?)', [cultura]);
};

// Eliminar una cultura por ID
export const borrarCultura = async (id) => {
  const [resultado] = await pool.query('DELETE FROM cultura WHERE cultura_id = ?', [id]);
  return resultado;
};