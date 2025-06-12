// backend/routes/authRoutes.js
import express from 'express';
import {
  login,
  register,
  solicitarRecuperacion,
  cambiarContrasena
} from '../controllers/authController.js';

const router = express.Router();

// Registro de usuario
router.post('/usuarios/register', register);

// Login
router.post('/auth/login', login);

// Solicitud de recuperación de contraseña (envía enlace con token)
router.post('/auth/solicitar-recuperacion', solicitarRecuperacion);

// Cambio de contraseña usando el token
router.post('/auth/cambiar-contrasena', cambiarContrasena);

export default router;