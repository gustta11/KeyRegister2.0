import Docente from '../model/DocenteModel.js';

// Função para buscar reservas pelo número de matrícula do docente
const getReservasByMatricula = (req, res) => {
    const { matricula_docentes } = req.body;

    if (!matricula_docentes) {
        console.error('Matrícula não informada');
        return res.status(400).json({ message: 'Matrícula não informada' });
    }

    Docente.findIdByMatricula(matricula_docentes, (err, id_docentes) => {
        if (err) {
            console.error('Erro ao buscar docente:', err);
            return res.status(500).json({ message: 'Erro no servidor ao buscar docente' });
        }
        if (!id_docentes) {
            console.error('Docente não encontrado para matrícula:', matricula_docentes);
            return res.status(404).json({ message: 'Docente não encontrado' });
        }

        Docente.findReservasByDocenteId(id_docentes, (err, reservas) => {
            if (err) {
                console.error('Erro ao buscar reservas:', err);
                return res.status(500).json({ message: 'Erro no servidor ao buscar reservas' });
            }
            if (reservas.length === 0) {
                console.warn('Nenhuma reserva encontrada para o docente:', id_docentes);
                return res.status(404).json({ message: 'Nenhuma reserva encontrada para esse docente' });
            }

            return res.json(reservas);
        });
    });
};

const getAllReservas = (req, res) => {
    const filters = {
        curso_nome: req.query.curso_nome,
        data: req.query.data,
        sala_nome: req.query.sala_nome,
        horario_inicial: req.query.horario_inicial,
        horario_final: req.query.horario_final,
        docente_nome: req.query.docente_nome,
        disciplina_nome: req.query.disciplina_nome
    };

    // Chama a função para buscar as reservas com os filtros
    Docente.findAllReservas(filters, (err, reservas) => {
        if (err) {
            console.error('Erro ao buscar reservas:', err);
            return res.status(500).json({ message: 'Erro ao buscar reservas' });
        }

        if (reservas.length === 0) {
            return res.status(404).json({ message: 'Nenhuma reserva encontrada com os filtros fornecidos' });
        }

        return res.json(reservas);
    });
};

// Função para atualizar o horário inicial e data ao retirar a chave
const updateReservaHorarioData = (req, res) => {
    const { id_docente } = req.body;

    if (!id_docente) {
        console.error('ID do docente não informado');
        return res.status(400).json({ message: 'ID do docente não informado' });
    }

    const horario_inicial = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    const data = new Date().toISOString().split('T')[0];

    Docente.updateReservaHorarioData(id_docente, horario_inicial, data, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar horário e data:', err);
            return res.status(500).json({ message: 'Erro ao atualizar horário e data' });
        }

        return res.json({ message: 'Horário inicial e data atualizados com sucesso' });
    });
};

// Função para atualizar o horário final ao devolver a chave
const updateReservaHorarioFinal = (req, res) => {
    const { id_docente } = req.body;

    if (!id_docente) {
        console.error('ID do docente não informado');
        return res.status(400).json({ message: 'ID do docente não informado' });
    }

    const horario_final = new Date().toLocaleTimeString('pt-BR', { hour12: false });

    Docente.updateReservaHorarioFinal(id_docente, horario_final, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar horário final:', err);
            return res.status(500).json({ message: 'Erro ao atualizar horário final' });
        }

        return res.json({ message: 'Horário final atualizado com sucesso' });
    });
};


export default { getReservasByMatricula, updateReservaHorarioData, updateReservaHorarioFinal, getAllReservas };



