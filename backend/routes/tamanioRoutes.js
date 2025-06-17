import express from 'express';
import { listarTamanios, crearTamanio } from '../controllers/tamanioController.js';

const router = express.Router();

router.get('/', listarTamanios);
router.post('/', crearTamanio);

export default router;