// backend/controllers/productoController.js
import {
  obtenerProductos,
  agregarProducto as modeloAgregar,
  actualizarProducto as modeloActualizar,
  eliminarProducto as modeloEliminar
} from '../models/productoModel.js';

import { pool } from '../config/db.js'; // Solo para obtener el stock

// Obtener todos los productos
export const listarProductos = async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// Obtener solo el stock de un producto
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

// Agregar nuevo producto
export const agregarProducto = async (req, res) => {
  const { piezas_id, cultura_id, tamanio_id, precio, stock } = req.body;

  console.log('➡️ Datos recibidos:', req.body);

  if (!piezas_id || !cultura_id || !tamanio_id || !precio || !stock) {
    console.warn('⚠️ Faltan campos');
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const resultado = await modeloAgregar({ piezas_id, cultura_id, tamanio_id, precio, stock });
    console.log('✅ Producto agregado:', resultado);
    res.status(201).json({ message: 'Producto agregado exitosamente' });
  } catch (error) {
    console.error('❌ Error SQL al agregar producto:', error.message);
    res.status(500).json({ message: 'Error al agregar producto', error: error.message });
  }
};

// Editar producto existente
export const editarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await modeloActualizar(id, req.body);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al editar producto:', error);
    res.status(500).json({ message: 'Error al editar producto' });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await modeloEliminar(id);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};