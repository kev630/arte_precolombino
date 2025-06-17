// backend/models/productoModel.js
import { pool } from '../config/db.js';

export const obtenerProductos = async () => {
  const [rows] = await pool.query(`
    SELECT 
      p.producto_id,
      p.piezas_id,
      p.cultura_id,
      p.tamanio_id,
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

export const agregarProducto = async ({ piezas_id, cultura_id, tamanio_id, precio, stock }) => {
  const [result] = await pool.query(
  'INSERT INTO productos (piezas_id, cultura_id, tamanio_id, precio, stock, fecha_modificacion) VALUES (?, ?, ?, ?, ?, NOW())',
  [piezas_id, cultura_id, tamanio_id, precio, stock]
);
  return result;
};

export const actualizarProducto = async (id, { piezas_id, cultura_id, tamanio_id, precio, stock }) => {
  const [result] = await pool.query(
    'UPDATE productos SET piezas_id = ?, cultura_id = ?, tamanio_id = ?, precio = ?, stock = ? WHERE producto_id = ?',
    [piezas_id, cultura_id, tamanio_id, precio, stock, id]
  );
  return result;
};

export const eliminarProducto = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM productos WHERE producto_id = ?',
    [id]
  );
  return result;
};