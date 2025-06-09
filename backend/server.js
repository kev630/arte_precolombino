import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'../frontend')));
app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.listen(3000, ()=> {
    console.log('Servidor corriendo en http://localhost:3000');
});

//------------------------ nuevo codigo
import ventaRoutes from './routes/ventaRoutes.js';
app.use('/api/ventas', ventaRoutes);