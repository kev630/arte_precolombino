// backend/routes/productoRoutes.js
import express from 'express';
import {
  listarProductos,
  obtenerStockProducto,
  agregarProducto,
  editarProducto,
  eliminarProducto
} from '../controllers/productoController.js';

import { verificarUsuario, autorizarRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// 📦 Públicos (para mostrar productos)
router.get('/', listarProductos);
router.get('/stock/:id', obtenerStockProducto);

// 🛡️ Protegidos para admin (rol 3)
router.post('/', verificarUsuario, autorizarRoles(3), agregarProducto);
router.put('/:id', verificarUsuario, autorizarRoles(3), editarProducto);
router.delete('/:id', verificarUsuario, autorizarRoles(3), eliminarProducto);

export default router;