const connection = require('./connection');
const bcrypt = require('bcrypt');

function cadastrarADM(req, res, callback) {
    const dadosCadastro = req.body;
    console.log(req.body);

    verificarSeMatriculaValida(dadosCadastro, res, (matriculaValida) => {
        if (matriculaValida) {
            armazenarDadosCadastro(dadosCadastro, res);
            callback(null, true)
        }
    });
}

function verificarSeMatriculaValida(dadosCadastro, res, callback) {
    const verificaMatriculaSql = 'SELECT COUNT(*) AS count FROM administrador WHERE matricula_adm = ?';
    connection.query(verificaMatriculaSql, [dadosCadastro['matricula']], (err, result) => {
        if (err) {
            erroVerificarMatricula(res, err);
            callback(false);
        } else {
            if (result[0].count > 0) {
                res.render('cadastro', { erro: 'Matrícula já cadastrada. Por favor, insira uma matrícula válida.' });
                callback(false);
            } else {
                callback(true);
            }
        }
    });
}

function armazenarDadosCadastro(dadosCadastro, res) {
    gerarHashSenha(dadosCadastro['senha'], (hashSenha) => {
        const sql = 'INSERT INTO administrador (nome, matricula_adm, cargo, senha_adm_hash) VALUES (?, ?, ?, ?)';
        connection.query(sql, [dadosCadastro['nome'], dadosCadastro['matricula'], dadosCadastro['cargo'], hashSenha], (err) => {
            if (err) {
                erroCadastrarADM(res, err);
            } else {
                console.log('Administrador cadastrado com sucesso!');
                res.status(200).send('Sucesso ao cadastrar administrador');
            }
        });
    });
}

function gerarHashSenha(senha, callback) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashSenha = bcrypt.hashSync(senha, salt);
    callback(hashSenha);
}

function erroVerificarMatricula(res, err) {
    console.error('Erro ao verificar matrícula:', err);
    res.status(500).send('Erro ao verificar matrícula');
}

function erroCadastrarADM(res, err) {
    console.error('Erro ao cadastrar administrador:', err);
    res.status(500).send('Erro ao cadastrar administrador');
}

module.exports = {
    cadastrarADM
};
