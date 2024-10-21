import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'KeyRegister2'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao realizar a conexão com o banco de dados: ', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

export default db;