const connection = require('./connection');

const getDataUser = (req, res) => {
    const dadosLogin = req.body;
    console.log(dadosLogin)

    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return;
        }
        console.log('Conexão bem-sucedida ao banco de dados');
    });


    const selectUserQuery = 'SELECT * FROM administrador WHERE matricula_ADM = ?';

    connection.query(selectUserQuery, [dadosLogin['matricula']], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            return;
        }


        if (results.length > 0) {
            const usuario = results[0];
            console.log('Usuário encontrado:', usuario);

        }
        else {
            console.log('Usuário não encontrado');
        }

        // Encerre a conexão após a consulta
        connection.end();
    });
};


module.exports = {
    getDataUser
};