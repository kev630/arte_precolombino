import { obtenerCulturas, insertarCultura, borrarCultura } from '../models/culturaModel.js';

// Listar todas las culturas
export const listarCulturas = async (req, res) => {
  try {
    const culturas = await obtenerCulturas();
    res.json(culturas);
  } catch (error) {
    console.error('Error al listar culturas:', error);
    res.status(500).json({ message: 'Error al obtener culturas' });
  }
};

// Crear una nueva cultura
export const crearCultura = async (req, res) => {
  console.log('Body recibido:', req.body); // <-- esta línea sí o sí

  const { cultura } = req.body;

  if (!cultura) {
    return res.status(400).json({ message: 'El nombre de la cultura es obligatorio' });
  }

  try {
    await insertarCultura(cultura);
    res.status(201).json({ message: 'Cultura agregada correctamente' });
  } catch (error) {
    console.error('Error al agregar cultura:', error);
    res.status(500).json({ message: 'Error al agregar cultura' });
  }
};

// Eliminar una cultura
export const eliminarCultura = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await borrarCultura(id);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Cultura no encontrada' });
    }
    res.json({ message: 'Cultura eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar cultura:', error);
    res.status(500).json({ message: 'Error al eliminar cultura' });
  }
};