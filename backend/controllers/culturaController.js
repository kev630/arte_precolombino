import { obtenerCulturas, insertarCultura } from '../models/culturaModel.js';

// Listar todas las culturas
export const listarCulturas = async (req, res) => {
  try {
    const culturas = await obtenerCulturas();
    res.json(culturas);
  } catch (error) {
    console.error('Error al obtener culturas:', error);
    res.status(500).json({ message: 'Error al obtener culturas' });
  }
};

// Crear una nueva cultura
export const crearCultura = async (req, res) => {
  const { cultura } = req.body;

  if (!cultura) {
    return res.status(400).json({ message: 'El nombre de la cultura es obligatorio' });
  }

  try {
    await insertarCultura(cultura);
    res.json({ message: 'Cultura agregada correctamente' });
  } catch (error) {
    console.error('Error al agregar cultura:', error);
    res.status(500).json({ message: 'Error al agregar cultura' });
  }
};