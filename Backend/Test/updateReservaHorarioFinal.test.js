const Docente = require('../model/DocenteModel.js'); 
const { updateReservaHorarioFinal } = require('../controller/DocenteController'); 


jest.mock('../model/DocenteModel.js');

describe('updateReservaHorarioFinal', () => {
    it('deve atualizar o horário final com sucesso quando o ID do docente é fornecido', async () => {
       
        Docente.updateReservaHorarioFinal.mockImplementation((id, horario, callback) => {
            callback(null, { affectedRows: 1 });
        });

        const req = { body: { id_docentes: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await updateReservaHorarioFinal(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Horário final atualizado com sucesso' });
    });

    it('deve retornar erro 404 se nenhuma reserva for encontrada para o ID do docente', async () => {
        Docente.updateReservaHorarioFinal.mockImplementation((id, horario, callback) => {
            callback(null, { affectedRows: 0 });
        });

        const req = { body: { id_docentes: 999 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await updateReservaHorarioFinal(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Nenhuma reserva encontrada para o ID do docente informado' });
    });

    it('deve retornar erro 500 ao falhar na atualização do horário final', async () => {
        Docente.updateReservaHorarioFinal.mockImplementation((id, horario, callback) => {
            callback(new Error('Erro de banco de dados'), null);
        });

        const req = { body: { id_docentes: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await updateReservaHorarioFinal(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao atualizar horário final' });
    });
});
