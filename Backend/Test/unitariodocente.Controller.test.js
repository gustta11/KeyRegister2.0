import db from "../config/db.js";
import Docente from "../model/DocenteModel.js"; 

jest.mock("../config/db.js");

describe("Modelo Docente", () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });
   
    test("findIdByMatricula deve retornar o ID do docente com base na matrícula", async () => {
        const matricula = '100522';
        const expectedId = 1;

        // Configura o mock para retornar um resultado simulado
        db.query.mockImplementation((query, params, callback) => {
            callback(null, [{ id_docentes: expectedId }]);
        });

        const id = await new Promise((resolve, reject) => {
            Docente.findIdByMatricula(matricula, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        expect(id).toBe(expectedId);
    });

    test("findIdByMatricula deve retornar null se a matrícula não for encontrada", async () => {
        const matricula = '100520';

        // Configura o mock para retornar um resultado simulado
        db.query.mockImplementation((query, params, callback) => {
            callback(null, []);
        });

        const id = await new Promise((resolve, reject) => {
            Docente.findIdByMatricula(matricula, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        expect(id).toBe(undefined);
    });

    test("updateReservaHorarioData deve atualizar o horário inicial e a data da reserva", async () => {
        const idDocente = 1;
        const horarioInicial = '08:00';
        const data = '2024-10-30';

        // Configura o mock para simular um resultado de atualização
        db.query.mockImplementation((query, params, callback) => {
            callback(null, { affectedRows: 1 });
        });

        const result = await new Promise((resolve, reject) => {
            Docente.updateReservaHorarioData(idDocente, horarioInicial, data, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        expect(result).toEqual({ affectedRows: 1 });
    });

    test("updateReservaHorarioFinal deve atualizar o horário final da reserva", async () => {
        const idDocente = 1;
        const horarioFinal = '10:00';

        // Configura o mock para simular um resultado de atualização
        db.query.mockImplementation((query, params, callback) => {
            callback(null, { affectedRows: 1 });
        });

        const result = await new Promise((resolve, reject) => {
            Docente.updateReservaHorarioFinal(idDocente, horarioFinal, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        expect(result).toEqual({ affectedRows: 1 });
    });

    test("findReservasByDocenteId deve retornar reservas detalhadas do docente", async () => {
        const idDocente = 1;
        const expectedReservas = [
            {
                turma_nome: "Desenvolvimento de sistema 2024",
                sala_nome: "Laboratorio de sistema",
                curso_nome: "Desenvolvimento de sistema",
                docente_nome: "Marcos Vinicius",
                disciplina_nome: "Banco de dados",
                horario_inicial: "19:40",
                horario_final: "21:40",
                data: "2024-10-27"
            }
        ];

        // Configura o mock para retornar resultados simulados
        db.query.mockImplementation((query, params, callback) => {
            callback(null, expectedReservas);
        });

        const reservas = await new Promise((resolve, reject) => {
            Docente.findReservasByDocenteId(idDocente, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        expect(reservas).toEqual(expectedReservas);
    });

    test("Deve tratar erros ao buscar reservas por ID do docente", async () => {
        const idDocente = 1;

        // Configura o mock para simular um erro
        db.query.mockImplementation((query, params, callback) => {
            callback(new Error("Erro ao buscar reservas"), null);
        });

        await expect(new Promise((resolve, reject) => {
            Docente.findReservasByDocenteId(idDocente, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        })).rejects.toThrow("Erro ao buscar reservas");
    });
    
    afterAll(() => {
        db.end();
      });
});
