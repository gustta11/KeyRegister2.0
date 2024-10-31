import request from 'supertest';
import app from '../../routes/DocenteRotas'; // Importe a configuração principal da aplicação

let matriculaDocente = '123456'; // Matrícula fictícia para os testes
let idDocente; // Variável para armazenar o id_docentes para os testes seguintes

// Função de configuração inicial dos testes
beforeAll(async () => {
    // Se necessário, configurar o banco de dados para o ambiente de teste
});

afterAll(async () => {
    // Se necessário, limpar dados de teste e fechar a conexão
});

describe('Testes de Integração - DocenteController', () => {
    // Teste para buscar reservas pelo número de matrícula
    test('Deve buscar reservas pelo número de matrícula', async () => {
        const response = await request(app)
            .post('/api/reservas/matricula')
            .send({ matricula_docentes: matriculaDocente });

        // Validação da resposta da API
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        // Captura o ID do docente para os próximos testes
        idDocente = response.body[0]?.id_docentes;
        expect(idDocente).toBeDefined();
    });

    // Teste para atualização do horário inicial e data ao retirar chave
    test('Deve atualizar horário inicial e data ao retirar chave', async () => {
        const response = await request(app)
            .put('/api/reservas/retirar-chave')
            .send({ id_docentes: idDocente });

        // Verifica se a resposta foi bem-sucedida e se a mensagem é a esperada
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Horário inicial e data atualizados com sucesso');
    });

    // Teste para atualização do horário final ao devolver chave
    test('Deve atualizar o horário final ao devolver chave', async () => {
        const response = await request(app)
            .put('/api/reservas/devolver-chave')
            .send({ id_docentes: idDocente });

        // Verifica se o horário final foi atualizado com sucesso
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Horário final atualizado com sucesso');
    });

    // Teste para buscar reservas por data
    test('Deve buscar reservas por data', async () => {
        const data = '2024-10-31'; // Data fictícia para o teste

        const response = await request(app)
            .get(`/api/reservas/data/${data}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(0); // Verifica se retorna uma lista, mesmo que vazia
    });

    // Teste para buscar reservas por sala
    test('Deve buscar reservas por sala', async () => {
        const sala = '101'; // Número de sala fictício para o teste

        const response = await request(app)
            .get(`/api/reservas/sala/${sala}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(0); // Verifica se retorna uma lista, mesmo que vazia
    });
});
