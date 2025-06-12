import express from 'express';
import {
  listarUsuarios,
  cambiarRolUsuario
} from '../controllers/usuarioController.js';
import { verificarToken, autorizarRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas protegidas para administradores
router.get('/listar', verificarToken, autorizarRoles(3), listarUsuarios);
router.put('/cambiar-rol', verificarToken, autorizarRoles(3), cambiarRolUsuario);

export default router;
