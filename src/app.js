const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const router = require('./router');
const app = express();
app.use(express.static('public'));
app.use(router);


// Config
    // Configurar a conexão com o banco de dados
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'easyhelp'
    });

    // Testa a conexão
    connection.connect((err) => {
        if (err) {
            console.error('Erro de conexão com o banco de dados:', err);
        } else {
            console.log('Conexão com o banco de dados bem-sucedida!');
        }
    });

    // Configuração de mecanismo de template
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json()); // Adicionando middleware para suportar JSON no corpo da solicitação
    app.use(express.static('public'));

app.post('/cadastro', (req, res) => {
    const dadosCadastro = req.body
    console.log(req.body)

    if (verificarSeMatriculaValida(res, req, dadosCadastro)){
        cadastrarADM(res, req, dadosCadastro)
        renderizarMenu(res, dadosCadastro['nome'])
    }
})


// Cadastro
function verificarSeMatriculaValida(res, req, dadosCadastro){
    let valida = true

    const verificaMatriculaSql = 'SELECT COUNT(*) AS count FROM Administrador WHERE matricula_adm = ?'
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
    const sql = 'INSERT INTO Administrador (nome, matricula_adm, cargo, senha_adm_hash) VALUES (?, ?, ?, ?)'


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


// Menu

function renderizarMenu(res, nome){
    // Redirecionar para a página 'inserir_problema.ejs'
    res.render('inserir_problema', { nome })
}





// Iniciar o servidor
const port = 3300 // substituir por porta usada no servidor local
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})