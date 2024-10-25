import express from 'express';
import docenteController from '../controller/DocenteController.js';

const router = express.Router();

// Rota para buscar reservas por matrícula do docente
router.post('/reservas/matricula', docenteController.getReservasByMatricula);

export default router;
