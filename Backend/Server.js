import express from 'express';
import cors from 'cors';
import docenteRoutes from './routes/DocenteRotas.js';

const app = express();

// Middleware para processar JSON e CORS
app.use(express.json());
app.use(cors());

// Rotas de docentes e reservas
app.use('/api', docenteRoutes);

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
