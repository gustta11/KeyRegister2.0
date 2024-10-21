import express from 'express';
import cors from 'cors';
import router from './auth/auth';

const app = express();
router
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

