const mysql = require('mysql2/promise');


// Configurar a conexão com o banco de dados
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'easyhelp'
});


module.exports = connection;
