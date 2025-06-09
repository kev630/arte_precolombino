import express from 'express';
import { listarVentas } from '../controllers/ventaController.js';

const router = express.Router();

router.get('/', listarVentas);

export default router;