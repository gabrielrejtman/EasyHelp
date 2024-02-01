const connection = require('./connection');
const bcrypt = require('bcrypt');

const getDataUser = (req, res) => {
    const dadosCadastro = req.body
    console.log(req.body)

    if (verificarSeMatriculaValida(res, req, dadosCadastro)){
        cadastrarADM(res, req, dadosCadastro);
        renderizarMenu(res, dadosCadastro['nome']);
    }

}

// Cadastro
function verificarSeMatriculaValida(res, req, dadosCadastro){
    let valida = true

    const verificaMatriculaSql = 'SELECT COUNT(*) AS count FROM administrador WHERE matricula_adm = ?'
    connection.query(verificaMatriculaSql, [dadosCadastro['matricula']], (err, result) => {

        if (err) {
            erroVerificarMatricula(res, err)
            valida = false
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

function cadastrarADM(res, req, dadosUsuario) {
    // Gerar um "sal" (um valor aleatório)
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)

    // Hash da senha com o sal
    const hashSenha = bcrypt.hashSync(dadosUsuario['senha'], salt)

    // Inserir dados no banco de dados
    let cadastradoComSucesso = false
    const sql = 'INSERT INTO administrador (nome, matricula_adm, cargo, senha_adm_hash) VALUES (?, ?, ?, ?)'


    connection.query(sql, [dadosUsuario['nome'], dadosUsuario['matricula'],
        dadosUsuario['cargo'], hashSenha], (err) => {

        if (err) {
            erroCadastrarADM(err, res)
        }

        else {
            console.log('Administrador cadastrado com sucesso!')
            cadastradoComSucesso = true
        }
    })
    return cadastradoComSucesso
}

function erroCadastrarADM(err, res){
    console.error('Erro ao cadastrar administrador:', err)
    res.status(500).send('Erro ao cadastrar administrador')
}

function renderizarMenu(res){
    const problemsQuery = 'SELECT * FROM problema'
    const getProblems = () => {
        return new Promise((resolve, reject) => {
            connection.query(problemsQuery, (err, results) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(results)
                }
                connection.end()
            })
        })
    }

    getProblems().then((problems) => {
            console.log(problems)
            res.render('inserir_problema', { problems });
        }).catch((err) => {
            console.error('Erro ao executar a consulta:', err)
            res.render('inserir_problema', { problems: [] })
        })
}


module.exports = {
    getDataUser
};