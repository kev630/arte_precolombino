// backend/routes/productoRoutes.js
import express from 'express';
import { listarProductos } from '../controllers/productoController.js';

const router = express.Router();

router.get('/', listarProductos);

export default router;

import { obtenerStockProducto } from '../controllers/productoController.js';

router.get('/stock/:id', obtenerStockProducto);