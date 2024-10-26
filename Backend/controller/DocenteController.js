import Docente from '../model/DocenteModel.js';

// Função para lidar com a requisição de buscar reservas por matrícula de docentes
const getReservasByMatricula = (req, res) => {
    const { matricula_docentes } = req.body;

    // Verifica se a matrícula foi informada
    if (!matricula_docentes) {
        return res.status(400).json({ message: 'Matrícula não informada' });
    }

    // Busca o id_docentes com base na matrícula
    Docente.findIdByMatricula(matricula_docentes, (err, id_docentes) => {
        if (err) {
            console.error('Erro ao buscar docente:', err);
            return res.status(500).json({ message: 'Erro no servidor ao buscar docente' });
        }
        if (!id_docentes) {
            return res.status(404).json({ message: 'Docente não encontrado' });
        }

        // Captura o horário e a data atuais
        const horario_inicial = new Date().toLocaleTimeString('pt-BR', { hour12: false });
        const data = new Date().toISOString().split('T')[0];

        // Atualiza a reserva com o horário_inicial e data
        Docente.updateReservaHorarioData(id_docentes, horario_inicial, data, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar horário e data:', err);
                return res.status(500).json({ message: 'Erro ao atualizar horário e data' });
            }

            // Busca as reservas com base no id_docentes
            Docente.findReservasByDocenteId(id_docentes, (err, reservas) => {
                if (err) {
                    console.error('Erro ao buscar reservas:', err);
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
