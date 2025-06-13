# mi_app_ejemplo
Sena trabajo en clase


Revisa tus carpetas
Ve a tu proyecto backend y revisa estas ubicaciones:

📁 controllers/
Busca archivos como:

piezaController.js

culturaController.js

tamanioController.js

📁 routes/
Busca archivos como:

piezaRoutes.js

culturaRoutes.js

tamanioRoutes.js




server.js
import piezaRoutes from './routes/piezaRoutes.js';
import culturaRoutes from './routes/culturaRoutes.js';
import tamanioRoutes from './routes/tamanioRoutes.js';

app.use('/api/piezas', piezaRoutes);
app.use('/api/cultura', culturaRoutes);
app.use('/api/tamanio', tamanioRoutes);
