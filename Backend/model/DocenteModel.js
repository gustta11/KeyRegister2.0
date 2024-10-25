import connection from '../config/Conecta.js';

// Função para buscar o id do docente pela matrícula
export function findIdByMatricula(matricula_docentes, callback) {
    const query = 'SELECT id_docentes FROM docentes WHERE matricula_docentes = ?';
    connection.query(query, [matricula_docentes], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null);  // Matrícula não encontrada
        }
        return callback(null, results[0].id_docentes);  // Retorna o id_docentes
    });
}

// Função para buscar reservas com base no id do docente
export function findReservasByDocenteId(id_docentes, callback) {
    const query = 'SELECT * FROM reservas WHERE id_docentes = ?';
    connection.query(query, [id_docentes], callback);
}

// Função para atualizar o horário_inicial e data da reserva de um docente
export function updateReservaHorarioData(id_docentes, horario_inicial, data, callback) {
    const query = 'UPDATE reservas SET horario_inicial = ?, data = ? WHERE id_docentes = ?';
    connection.query(query, [horario_inicial, data, id_docentes], callback);
}

export default {
    findIdByMatricula,
    findReservasByDocenteId,
    updateReservaHorarioData
};


