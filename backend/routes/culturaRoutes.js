import express from 'express';
import { listarCulturas, crearCultura } from '../controllers/culturaController.js';

const router = express.Router();

router.get('/', listarCulturas);
router.post('/', crearCultura);

export default router;