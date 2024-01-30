const connection = require('./connection');

const getDataUser = async (req, res) => {
    const dadosLogin = await req.body;
    console.log(dadosLogin)

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