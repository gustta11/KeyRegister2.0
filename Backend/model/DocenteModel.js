
import  Conecta from '../config/Conecta';// Certifique-se de que o db está corretamente configurado

const Docente = {
    findIdByMatricula: (matricula_docentes, callback) => {
        const query = 'SELECT id_docentes FROM docentes WHERE matricula = ?';
        db.query(query, [matricula_docentes], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]?.id_docentes); // Retorna o id_docentes se encontrado
        });
    },

    updateReservaHorarioData: (id_docentes, horario_inicial, data, callback) => {
        const query = 'UPDATE reservas SET horario = ?, data = ? WHERE id_docentes = ?';
        db.query(query, [horario_inicial, data, id_docentes], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    findReservasByDocenteId: (id_docentes, callback) => {
        const query = 'SELECT * FROM reservas WHERE id_docentes = ?';
        db.query(query, [id_docentes], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

export default Docente;
