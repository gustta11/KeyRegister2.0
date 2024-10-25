import Docente from '../model/DocenteModel.js';

// Função para lidar com a requisição de buscar reservas por matrícula de docentes
const getReservasByMatricula = (req, res) => {
    const { matricula_docentes } = req.body;

    if (!matricula_docentes) {
        return res.status(400).json({ message: 'Matrícula não informada' });
    }

    // Primeiro, busca o id_docentes com base na matrícula
    Docente.findIdByMatricula(matricula_docentes, (err, id_docentes) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor ao buscar docente' });
        }
        if (!id_docentes) {
            return res.status(404).json({ message: 'Docente não encontrado' });
        }

        // Capturar o horário e a data atuais
        const horario_inicial = new Date().toLocaleTimeString('pt-BR', { hour12: false });
        const data = new Date().toISOString().split('T')[0];  // Formato YYYY-MM-DD

        // Atualizar a reserva com o horário_inicial e data
        Docente.updateReservaHorarioData(id_docentes, horario_inicial, data, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao atualizar horário e data' });
            }

            // Agora busca as reservas com base no id_docentes
            Docente.findReservasByDocenteId(id_docentes, (err, reservas) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro no servidor ao buscar reservas' });
                }
                if (reservas.length === 0) {
                    return res.status(404).json({ message: 'Nenhuma reserva encontrada para esse docente' });
                }

                // Retorna as reservas encontradas
                return res.json(reservas);
            });
        });
    });
};

export default { getReservasByMatricula };

