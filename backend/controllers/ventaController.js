import { pool } from '../config/db.js';

export const listarVentas = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM ventas');
  res.json(rows);
};

export const crearVenta = async (req, res) => {
  const { usuario_id, fecha, total, productos } = req.body;

  const [ventaResult] = await pool.query(
    'INSERT INTO ventas(usuario_id, fecha, total) VALUES (?, ?, ?)',
    [usuario_id, fecha, total]
  );

  const venta_id = ventaResult.insertId;

  for (const prod of productos) {
    await pool.query(
      'INSERT INTO detalle_de_venta(venta_id, producto_id, cantidad, subtotal) VALUES (?, ?, ?, ?)',
      [venta_id, prod.producto_id, prod.cantidad, prod.subtotal]
    );
  }

  res.status(201).json({ message: 'Venta realizada' });
};
