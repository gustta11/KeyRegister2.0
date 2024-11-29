import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'keyregister'
});

db.connect((err) => {
    if (err) {
        console.log(`Erro ao conectar ao banco de dados: ${err}`);
        return;
    }
    console.log("Conectado ao banco de dados com sucesso!");
});


export default db;