// Backend/Test/performance.test.js

const request = require('supertest');
const app = require('../../Frontend/src/App'); 

describe('Teste de Performance para o endpoint /api/reservas/retirar-chave', () => {
    it('deve medir o tempo de resposta para atualizar o horário final', async () => {
        const startTime = Date.now();
        const response = await request(app)
            .post('/api/reservas/retirar-chave')
            .send({ id_docentes: 1 });
        const endTime = Date.now();

        const duration = endTime - startTime; // tempo em milissegundos
        console.log(`Tempo de resposta: ${duration} ms`);

        expect(response.status).toBe(200); // verifica se a resposta foi bem-sucedida
        expect(response.body.message).toBe('Horário final atualizado com sucesso');
        expect(duration).toBeLessThan(200); // espera-se que o tempo de resposta seja menor que 200 ms
    });

    it('deve manter o desempenho sob carga alta', async () => {
        const numberOfRequests = 100; // Número de requisições simultâneas
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

        const duration = endTime - startTime; // tempo total em milissegundos
        console.log(`Tempo total para ${numberOfRequests} requisições: ${duration} ms`);

        expect(responses.every(response => response.status === 200)).toBe(true); // todas as requisições devem ser bem-sucedidas
        expect(duration).toBeLessThan(3000); // espera-se que o tempo total seja menor que 3000 ms
    });
});
