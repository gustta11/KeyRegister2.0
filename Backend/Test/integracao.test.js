
const request = require('supertest');
const app = require('../App'); // Importe o caminho correto do seu app Express
const db = require('../config/db'); // Importe a configuração de conexão com o banco

describe('Testes de Integração para Retirada e Devolução de Chave', () => {
    
    let reservaId;

    // Antes de cada teste, cria uma nova reserva para simular o cenário real
    beforeAll(async () => {
        const novaReserva = {
            id_docentes: 1,
            id_chave: 1,
            horario_inicial: '2024-06-10T10:00:00.000Z',
            horario_final: null
        };
        
        const response = await request(app)
            .post('/api/reservas/matricula')
            .send(novaReserva);

        reservaId = response.body.id;
    });


    it('Deve retirar a chave e atualizar o horário inicial corretamente', async () => {
        const response = await request(app)
            .post('/api/reservas/retirar-chave')
            .send({ id_docentes: 1 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Horário inicial atualizado com sucesso');
    });

    it('Deve devolver a chave e atualizar o horário final corretamente', async () => {
        const response = await request(app)
            .post('/api/reservas/devolver-chave')
            .send({ id_docentes: 1 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Horário final atualizado com sucesso');
    });

    it('Deve verificar se o horário inicial e final foram atualizados no banco', async () => {
        const response = await db.query('SELECT horario_inicial, horario_final FROM reservas WHERE id = ?', [reservaId]);

        expect(response[0].horario_inicial).not.toBeNull();
        expect(response[0].horario_final).not.toBeNull();
    });
});
