const connection = require('./connection')

function cadastrarProblema(req, res) {
    const dadosProblema = req.body
    const sql = 'INSERT INTO problema (titulo, descricao, dificuldade, categoria) VALUES (?, ?, ?, ?)'
    console.log(dadosProblema)

    connection.query(sql, [dadosProblema['titulo'], dadosProblema['descricao'],
        dadosProblema['dificuldade'], dadosProblema['categoria']], (err) => {

        if (err) {
            console.log(err)
        }

        console.log('Problema cadastrado com sucesso!')
    })
}


function readProblemas(callback) {
    const sql = 'SELECT * FROM problema';

    connection.query(sql, (err, resultados) => {
        if (err) {
            console.log('Erro ao buscar problemas:', err);
            return callback(err, null);
        }

        // Pass the result to the callback
        callback(null, resultados);
    });
}



function updateProblema(req, res) {
    const { id } = req.params;
    const dadosProblema = req.body;
    const sql = 'UPDATE problema SET titulo = ?, descricao = ?, dificuldade = ?, categoria = ?, arquivos = ? WHERE id = ?';

    connection.query(sql, [dadosProblema.titulo, dadosProblema.descricao, dadosProblema.dificuldade, dadosProblema.categoria, dadosProblema.arquivos, id], (err, result) => {
        if (err) {
            console.log('Erro ao atualizar problema:', err);
            res.status(500).send('Erro ao atualizar problema');
            return;
        }

        res.send('Problema atualizado com sucesso');
    });
}



function deleteProblema(req, res) {
    const { id } = req.params;
    const sql = 'DELETE FROM problema WHERE id = ?';

    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Erro ao excluir problema:', err);
            res.status(500).send('Erro ao excluir problema');
            return;
        }

        res.send('Problema excluído com sucesso');
    });
}



module.exports = {
    cadastrarProblema,
    readProblemas
}
