const mysql = require('mysql2');


// Configurar a conexão com o banco de dados
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'easyhelp'
});


module.exports = connection;