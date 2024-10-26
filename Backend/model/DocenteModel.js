import db from "../config/db.js"; // Certifique-se de que o db está corretamente configurado

const Docente = {
    findIdByMatricula: (matricula_docentes, callback) => {
        const query = 'SELECT id_docentes FROM docentes WHERE matricula_docentes = ?';
        db.query(query, [matricula_docentes], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]?.id_docentes);
        });
    },

    updateReservaHorarioData: (id_docentes, horario_inicial, data, callback) => {
        const query = 'UPDATE reservas SET horario_inicial = ?, data = ? WHERE docentes_id = ?';
        db.query(query, [horario_inicial, data, id_docentes], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    findReservasByDocenteId: (id_docentes, callback) => {
        const query = 'SELECT * FROM reservas WHERE docentes_id = ?';
        db.query(query, [id_docentes], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

export default Docente;
