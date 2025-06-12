// backend/models/productoModel.js
import { pool } from '../config/db.js';

export const obtenerProductos = async () => {
  const [rows] = await pool.query(`
    SELECT 
      p.producto_id,
      pi.nombre_pieza,
      c.cultura,
      t.tamanio,
      p.precio,
      p.stock
    FROM productos p
    JOIN piezas pi ON p.piezas_id = pi.piezas_id
    JOIN cultura c ON p.cultura_id = c.cultura_id
    JOIN tamanio t ON p.tamanio_id = t.tamanio_id
  `);
  return rows;
};
