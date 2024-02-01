const connection = require('./connection')

function cadastrarProblema(req, res) {
    const dadosProblema = req.body
    const sql = 'INSERT INTO problema (titulo, descricao, dificuldade, categoria) VALUES (?, ?, ?, ?)'
    console.log(dadosProblema)

    connection.query(sql, [dadosProblema['titulo'], dadosProblema['descricao'],
        dadosProblema['dificuldade'], dadosProblema['categoria']], (err) => {

        if (err) {
            console.log('erro cadastro de problema')
        }

        else {
            console.log('Problema cadastrado com sucesso!')
        }
    })
}

module.exports = {
    cadastrarProblema
}