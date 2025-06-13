// backend/routes/piezaRoutes.js
import express from 'express';
import { listarPiezas, crearPieza } from '../controllers/piezaController.js';

const router = express.Router();

router.get('/', listarPiezas);
router.post('/', crearPieza); // Nuevo endpoint

export default router;