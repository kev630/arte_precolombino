import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas
import authRoutes from './routes/authRoutes.js';
app.use('/api', authRoutes);

import piezaRoutes from './routes/piezaRoutes.js';
app.use('/api/piezas', piezaRoutes);

import ventaRoutes from './routes/ventaRoutes.js';
app.use('/api/ventas', ventaRoutes);

import productoRoutes from './routes/productoRoutes.js';
app.use('/api/productos', productoRoutes);

import culturaRoutes from './routes/culturaRoutes.js';
app.use('/api/culturas', culturaRoutes);

import tamanioRoutes from './routes/tamanioRoutes.js';
app.use('/api/tamanios', tamanioRoutes);

// Ruta por defecto
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
