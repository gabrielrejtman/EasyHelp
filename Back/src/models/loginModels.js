const connection = require('./connection');

function login(req, res, callback) {
    const dadosLogin = req.body;
    const selectUserQuery = 'SELECT * FROM administrador WHERE matricula_ADM = ?';

    connection.query(selectUserQuery, [dadosLogin['matricula']], (err, results) => {
        console.log(results);
        if (err) {
            console.error(err);
            // Passa um erro para o callback
            return callback(err, false);
        }

        if (results.length > 0) {
            // Se o usuário for encontrado, retorna true
            return callback(null, true);
        } else {
            // Se o usuário não for encontrado, retorna false
            return callback('Usuário não encontrado', false);
        }
    });
}


module.exports = {
    login
};
