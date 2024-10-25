import mysql from 'mysql'

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'keyregister'
})

connection.connect((err)=>{
    if(err){
        console.log(`Erro ao conectar ao banco de dados ${err}`)
        return
    }
    console.log("Conectado ao banco de dados com sucesso!")
})

export default connection