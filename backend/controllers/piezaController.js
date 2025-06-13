// backend/controllers/piezaController.js
import { obtenerPiezas, insertarPieza } from '../models/piezaModel.js';

// Listar todas las piezas
export const listarPiezas = async (req, res) => {
  try {
    const rows = await obtenerPiezas();
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener piezas:', error);
    res.status(500).json({ message: 'Error al obtener piezas' });
  }
};

// Crear una nueva pieza
export const crearPieza = async (req, res) => {
  const { nombre_pieza } = req.body;

  if (!nombre_pieza) {
    return res.status(400).json({ message: 'El nombre de la pieza es obligatorio' });
  }

  try {
    await insertarPieza(nombre_pieza);
    res.json({ message: 'Pieza creada correctamente' });
  } catch (error) {
    console.error('Error al crear pieza:', error);
    res.status(500).json({ message: 'Error al crear pieza' });
  }
};