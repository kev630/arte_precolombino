import { obtenerTamanios, insertarTamanio } from '../models/tamanioModel.js';

// Listar todos los tamaños
export const listarTamanios = async (req, res) => {
  try {
    const tamanios = await obtenerTamanios();
    res.json(tamanios);
  } catch (error) {
    console.error('Error al obtener tamaños:', error);
    res.status(500).json({ message: 'Error al obtener tamaños' });
  }
};

// Crear nuevo tamaño
export const crearTamanio = async (req, res) => {
  const { tamanio } = req.body;

  if (!tamanio) {
    return res.status(400).json({ message: 'El tamaño es obligatorio' });
  }

  try {
    await insertarTamanio(tamanio);
    res.json({ message: 'Tamaño agregado correctamente' });
  } catch (error) {
    console.error('Error al crear tamaño:', error);
    res.status(500).json({ message: 'Error al crear tamaño' });
  }
};