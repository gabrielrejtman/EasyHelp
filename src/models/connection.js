import mysql from 'mysql2/promise';


// Configurar a conexão com o banco de dados
export const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'easyhelp'
});
