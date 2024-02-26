const connection = require("./connection");
const menu = require('./menuModels')

const sql = 'SELECT * FROM problema WHERE id = ? OR titulo LIKE ? OR descricao LIKE ?';
const parametros = [id, `%${titulo}%`, `%${descricao}%`];


db.query(sql, parametros, (err, result) => {
    if (err) {
        res.status(500).send('Erro ao buscar problemas.');
        throw err;
    }
    res.json(result);
});
