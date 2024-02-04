const connection = require('./connection')

function cadastrarProblema(req, res) {
    const dadosProblema = req.body
    const sql = 'INSERT INTO problema (titulo, descricao, dificuldade, categoria) VALUES (?, ?, ?, ?)'
    console.log(dadosProblema)

    connection.query(sql, Object.values(dadosProblema), (err) => {

        if (err) {
            console.log('erro no cadastro de Problema')
        }

        else {
            console.log('Problema cadastrado com sucesso!')
        }
    })
}

module.exports = {
    cadastrarProblema
}