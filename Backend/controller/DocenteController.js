import Docente from '../model/DocenteModel.js';

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

        const horario_inicial = new Date().toLocaleTimeString('pt-BR', { hour12: false });
        const data = new Date().toISOString().split('T')[0];

        // Passando o horário final se necessário ou removendo o parâmetro
        Docente.updateReservaHorarioData(id_docentes, horario_inicial, data, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar horário e data:', err);
                return res.status(500).json({ message: 'Erro ao atualizar horário e data' });
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
    });
};

export default { getReservasByMatricula };
