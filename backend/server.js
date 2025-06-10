import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
// Para obtener __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Servir archivos estáticos desde el frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Montar las rutas de autenticación
app.use('/api', authRoutes); // <-- Añadido

// Ruta raíz que sirve login.html por defecto
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});