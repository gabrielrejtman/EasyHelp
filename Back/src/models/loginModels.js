const connection = require('./connection');
const menu = require('./menuModels');

function login (req, res) {
    const dadosLogin = req.body;
    const selectUserQuery = 'SELECT * FROM administrador WHERE matricula_ADM = ?';
    const tryToLogin = () => {
        return new Promise((resolve, reject) => {
            connection.query(selectUserQuery, [dadosLogin['matricula']], (err, results) => {
                console.log(results)
                if (err) { reject(err) }

                if (results.length > 0) { resolve(results[0]) }

                else { reject('Usuário não encontrado') }
            })
        })
    }

    tryToLogin().then(() => {menu.renderizarMenu(res)}).catch((err) => {console.log(err)})
}


module.exports = {
    login
};
