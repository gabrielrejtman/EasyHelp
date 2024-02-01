const connection = require('./connection');
const bcrypt = require('bcrypt');
const menu = require('./menuModels')

const cadastrarADM = (req, res) => {
    const dadosCadastro = req.body
    console.log(req.body)

    if (verificarSeMatriculaValida(res, dadosCadastro)){
        armazenarDadosCadastroADM(dadosCadastro);
        menu.renderizarMenu(res);
    }

}

// Cadastro
function verificarSeMatriculaValida(res, dadosCadastro){
    let valida = true

    const verificaMatriculaSql = 'SELECT COUNT(*) AS count FROM administrador WHERE matricula_adm = ?'
    connection.query(verificaMatriculaSql, [dadosCadastro['matricula']], (err, result) => {

        if (err) {
            erroVerificarMatricula(res, err)
            return
        }

        // A matrícula já está cadastrada
        if (result[0].count > 0){
            res.render('cadastro', { erro: 'Matrícula já cadastrada. Por favor, insira uma matrícula válida.' });
            valida = false
        }
    })
    return valida
}

function erroVerificarMatricula(res, err){
    console.error('Erro ao verificar matrícula:', err);
    res.status(500).send('Erro ao verificar matrícula');
}

function armazenarDadosCadastroADM(dadosCadastro) {
    // Gerar um "sal" (um valor aleatório)
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)

    // Hash da senha com o sal
    const hashSenha = bcrypt.hashSync(dadosCadastro['senha'], salt)

    // Inserir dados no banco de dados
    const sql = 'INSERT INTO administrador (nome, matricula_adm, cargo, senha_adm_hash) VALUES (?, ?, ?, ?)'


    connection.query(sql, [dadosCadastro['nome'], dadosCadastro['matricula'],
        dadosCadastro['cargo'], hashSenha], (err) => {

        if (err) {
            erroCadastrarADM(err)
        }

        else {
            console.log('Administrador cadastrado com sucesso!')
        }
    })
}

function erroCadastrarADM(err){
    console.error('Erro ao cadastrar administrador:', err)
}



module.exports = {
    cadastrarADM
};