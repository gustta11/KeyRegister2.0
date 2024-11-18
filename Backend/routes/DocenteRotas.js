import express from 'express';
import DocenteController from '../controller/DocenteController.js';
import multer from 'multer';

const router = express.Router();

// Configuração do multer
const upload = multer({ dest: 'uploads/' });

// Rota para importar reservas
router.post('/importar-reservas', upload.single('file'), DocenteController.importarReservas);

// Rota para obter todas as reservas
router.get('/reservas', DocenteController.getAllReservas);

// Rota para obter reservas pelo número de matrícula
router.post('/reservas/matricula', DocenteController.getReservasByMatricula);

// Rota para atualizar horário inicial e data ao retirar a chave
router.post('/reservas/retirar-chave', DocenteController.updateReservaHorarioData);

// Rota para atualizar horário final ao devolver a chave
router.post('/reservas/devolver-chave', DocenteController.updateReservaHorarioFinal);

export default router;
