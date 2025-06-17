import { pool } from '../config/db.js';

export const obtenerTamanios = async () => {
  const [rows] = await pool.query('SELECT * FROM tamanio');
  return rows;
};

export const insertarTamanio = async (tamanio) => {
  await pool.query('INSERT INTO tamanio (tamanio) VALUES (?)', [tamanio]);
};
