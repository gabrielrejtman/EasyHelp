const connection = require('./connection');
const { v4: uuidv4 } = require('uuid');


const cadastrarProblema = async (problema) =>  {
    const { titulo, descricao, dificuldade, categoria } = problema
    const id = uuidv4()
    const query = 'INSERT INTO problema (id, titulo, descricao, dificuldade, categoria) VALUES (?, ?, ?, ?, ?)'

    const [result] = await connection.execute(query, [id, titulo, descricao, dificuldade, categoria]);

    return result    
}




function readProblemas(req, res) {
    const sql = 'SELECT * FROM problema';
    
    connection.query(sql, (err, resultados) => {
        if (err) {
            console.log('Erro ao buscar problemas:', err);
            res.status(500).send('Erro ao buscar problemas');
            return;
        }

        res.json(resultados);
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
}
