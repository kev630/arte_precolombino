import express from 'express';
import {
  listarCulturas,
  crearCultura, // corregido aquí
  eliminarCultura
} from '../controllers/culturaController.js';

import { verificarUsuario, autorizarRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', listarCulturas);

// Rutas protegidas solo para admin (rol 3)
router.post('/', verificarUsuario, autorizarRoles(3), crearCultura);
router.delete('/:id', verificarUsuario, autorizarRoles(3), eliminarCultura);

export default router;