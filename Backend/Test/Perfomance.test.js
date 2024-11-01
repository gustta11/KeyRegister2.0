const request = require('supertest');
const app = require('../../Frontend/src/App'); 

describe('POST /api/reservas/retirar-chave', () => {

    it('deve medir o tempo de resposta para atualizar o horário final', async () => {
        const startTime = Date.now();
        const response = await request(app)
            .post('/api/reservas/retirar-chave')
            .send({ id_docentes: 1 });
        const endTime = Date.now();

        const duration = endTime - startTime;
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Horário final atualizado com sucesso');
        expect(duration).toBeLessThan(200);
    });

    it('deve manter o desempenho sob carga alta', async () => {
        const numberOfRequests = 100;
        const requests = [];

        for (let i = 0; i < numberOfRequests; i++) {
            requests.push(
                request(app)
                    .post('/api/reservas/retirar-chave')
                    .send({ id_docentes: 1 })
            );
        }

        const startTime = Date.now();
        const responses = await Promise.all(requests);
        const endTime = Date.now();

        const duration = endTime - startTime;
        expect(responses.every(response => response.status === 200)).toBe(true);
        expect(duration).toBeLessThan(3000);
    });
});