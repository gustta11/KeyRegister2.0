const request = require('supertest');
const App = require('../../Frontend/src/App'); 

describe('POST /api/reservas/retirar-chave', () => {
    it('deve atualizar o horário final e retornar uma mensagem de sucesso', async () => {
        const response = await request(app)
            .post('/api/reservas/retirar-chave')
            .send({ id_docentes: 1 });
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Horário final atualizado com sucesso');
    });

    it('deve retornar erro 404 se o ID do docente não existir', async () => {
        const response = await request(app)
            .post('/api/reservas/retirar-chave')
            .send({ id_docentes: 2 });
        
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Nenhuma reserva encontrada para o ID do docente informado');
    });
});
