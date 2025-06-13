import express from 'express';
import {
  listarTamanios,
  crearTamanio,        // corregido aquí
  eliminarTamanio
} from '../controllers/tamanioController.js';

import { verificarUsuario, autorizarRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', listarTamanios);

// Solo admin (rol 3)
router.post('/', verificarUsuario, autorizarRoles(3), crearTamanio);  // corregido aquí
router.delete('/:id', verificarUsuario, autorizarRoles(3), eliminarTamanio);

export default router;