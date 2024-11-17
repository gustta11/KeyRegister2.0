import db from "../config/db.js"; // Importa a configuração do banco de dados

// Modelo Docente com funções para interagir com o banco de dados
const Docente = {
    // Função para encontrar o ID do docente com base na matrícula fornecida
    findIdByMatricula: (matricula_docentes, callback) => {
        // Consulta SQL para buscar o ID do docente onde a matrícula corresponde
        const query = 'SELECT id_docentes FROM docentes WHERE matricula_docentes = ?';
        
        // Executa a consulta com a matrícula como parâmetro
        db.query(query, [matricula_docentes], (err, results) => {
            if (err) return callback(err, null); // Retorna erro, se houver
            callback(null, results[0]?.id_docentes); // Retorna o ID do docente ou null se não encontrado
        });
    },

    // Função para atualizar o horário inicial e a data na tabela reservas para um docente específico
    updateReservaHorarioData: (id_docentes, horario_inicial, data, callback) => {
        // Consulta SQL para atualizar os campos horario_inicial e data
        const query = 'UPDATE reservas SET horario_inicial = ?, data = ? WHERE docentes_id = ?';
        
        // Executa a consulta com os valores de horário, data e ID do docente
        db.query(query, [horario_inicial, data, id_docentes], (err, result) => {
            if (err) return callback(err, null); // Retorna erro, se houver
            callback(null, result); // Retorna o resultado da atualização
        });
    },

    // Função para atualizar o horário final na tabela reservas para um docente específico
    updateReservaHorarioFinal: (id_docentes, horario_final, callback) => {
        // Consulta SQL para atualizar o campo horario_final
        const query = 'UPDATE reservas SET horario_final = ? WHERE docentes_id = ?';
        
        // Executa a consulta com o horário final e ID do docente
        db.query(query, [horario_final, id_docentes], (err, result) => {
            if (err) return callback(err, null); // Retorna erro, se houver
            callback(null, result); // Retorna o resultado da atualização
        });
    },

    // Função para buscar reservas detalhadas de um docente, incluindo informações de várias tabelas relacionadas
    findReservasByDocenteId: (id_docentes, callback) => {
        // Consulta SQL com JOIN para combinar as tabelas relacionadas e retornar os campos solicitados
        const query = `
            SELECT 
                t.nome_turma AS turma_nome,        -- Nome da turma
                s.salas_nome AS sala_nome,         -- Nome da sala
                c.curso_nome AS curso_nome,        -- Nome do curso
                d.nome_docentes AS docente_nome,   -- Nome do docente
                disc.disciplinas_nome AS disciplina_nome,  -- Nome da disciplina
                r.horario_inicial,                 -- Horário inicial da reserva
                r.horario_final,                   -- Horário final da reserva
                r.data,                             -- Data da reserva
                r.docentes_id
            FROM 
                reservas r                         -- Tabela principal (reservas)
            JOIN 
                docentes d ON r.docentes_id = d.id_docentes  -- Associa reservas com docentes
            JOIN 
                salas s ON r.salas_id = s.id_salas             -- Associa reservas com salas
            JOIN 
                cursos c ON r.cursos_idcursos = c.id_cursos          -- Associa reservas com cursos
            JOIN 
                turma t ON r.turma_idturma = t.id_turma         -- Associa reservas com turmas
            JOIN 
                disciplinas disc ON r.disciplinas_idDisciplinas = disc.id_disciplinas  -- Associa reservas com disciplinas
            WHERE 
                d.id_docentes = ?                 -- Filtra por ID do docente fornecido
        `;

        // Executa a consulta com o ID do docente como parâmetro
        db.query(query, [id_docentes], (err, results) => {
            if (err) return callback(err, null); // Retorna erro, se houver
            callback(null, results); // Retorna os resultados encontrados
        });
    },
       // Função para buscar todas reservas e aceita filtros
       findAllReservas: (filters, callback) => {
        let query = `
            SELECT 
                t.nome_turma AS turma_nome,
                s.salas_nome AS sala_nome,
                c.curso_nome AS curso_nome,
                d.nome_docentes AS docente_nome,
                disc.disciplinas_nome AS disciplina_nome,
                r.horario_inicial,
                r.horario_final,
                r.data,
                r.docentes_id
            FROM 
                reservas r
            JOIN 
                docentes d ON r.docentes_id = d.id_docentes
            JOIN 
                salas s ON r.salas_id = s.id_salas
            JOIN 
                cursos c ON r.cursos_idcursos = c.id_cursos
            JOIN 
                turma t ON r.turma_idturma = t.id_turma
            JOIN 
                disciplinas disc ON r.disciplinas_idDisciplinas = disc.id_disciplinas
        `;
        
        const conditions = [];
        const params = [];
    
        // Adiciona condições com base nos filtros fornecidos
        if (filters.curso_nome) {
            conditions.push('c.curso_nome = ?');
            params.push(filters.curso_nome);
        }
        if (filters.data) {
            conditions.push('r.data = ?');
            params.push(filters.data);
        }
        if (filters.sala_nome) {
            conditions.push('s.salas_nome = ?');
            params.push(filters.sala_nome);
        }
        if (filters.horario_inicial && filters.horario_final) {
            conditions.push('r.horario_inicial >= ? AND r.horario_final <= ?');
            params.push(filters.horario_inicial, filters.horario_final);
        }
        if (filters.docente_nome) {
            conditions.push('d.nome_docentes LIKE ?');
            params.push(`%${filters.docente_nome}%`); // Permite busca parcial
        }
        if (filters.disciplina_nome) {
            conditions.push('disc.disciplinas_nome LIKE ?');
            params.push(`%${filters.disciplina_nome}%`); // Permite busca parcial
        }
    
        // Concatena as condições à query
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
    
        // Executa a consulta com os parâmetros
        db.query(query, params, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

// Exporta o modelo Docente para uso em outras partes do aplicativo
export default Docente;

