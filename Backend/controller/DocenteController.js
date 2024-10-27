import Docente from '../model/DocenteModel.js'; // Importa o modelo Docente para interagir com o banco de dados

// Função para buscar reservas pelo número de matrícula do docente
const getReservasByMatricula = (req, res) => {
    const { matricula_docentes } = req.body; // Extrai a matrícula do corpo da requisição

    // Verifica se a matrícula foi fornecida
    if (!matricula_docentes) {
        console.error('Matrícula não informada');
        return res.status(400).json({ message: 'Matrícula não informada' });
    }

    // Busca o ID do docente baseado na matrícula fornecida
    Docente.findIdByMatricula(matricula_docentes, (err, id_docentes) => {
        if (err) {
            console.error('Erro ao buscar docente:', err);
            return res.status(500).json({ message: 'Erro no servidor ao buscar docente' });
        }
        if (!id_docentes) {
            console.error('Docente não encontrado para matrícula:', matricula_docentes);
            return res.status(404).json({ message: 'Docente não encontrado' });
        }

        // Obtém o horário atual e a data para atualizar o campo da reserva
        const horario_inicial = new Date().toLocaleTimeString('pt-BR', { hour12: false });
        const data = new Date().toISOString().split('T')[0];

        // Atualiza o horário inicial e a data para o docente identificado
        Docente.updateReservaHorarioData(id_docentes, horario_inicial, data, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar horário e data:', err);
                return res.status(500).json({ message: 'Erro ao atualizar horário e data' });
            }

            // Busca todas as reservas do docente com informações detalhadas das tabelas associadas
            Docente.findReservasByDocenteId(id_docentes, (err, reservas) => {
                if (err) {
                    console.error('Erro ao buscar reservas:', err);
                    return res.status(500).json({ message: 'Erro no servidor ao buscar reservas' });
                }
                if (reservas.length === 0) {
                    console.warn('Nenhuma reserva encontrada para o docente:', id_docentes);
                    return res.status(404).json({ message: 'Nenhuma reserva encontrada para esse docente' });
                }

                // Retorna as reservas detalhadas como resposta
                return res.json(reservas);
            });
        });
    });
};

export default { getReservasByMatricula }; // Exporta o controlador para uso em rotas

