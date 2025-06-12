import { pool } from '../config/db.js';

export const listarProductos = async (req, res) => {
  try {
    const [productos] = await pool.query(`
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

    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const obtenerStockProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT stock FROM productos WHERE producto_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ stock: rows[0].stock });
  } catch (error) {
    console.error('Error al obtener stock:', error);
    res.status(500).json({ message: 'Error al obtener stock' });
  }
};
