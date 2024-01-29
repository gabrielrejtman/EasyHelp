const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const app = express();
const port = 3300; // substituir por porta usada no servidor local
app.use(express.static('public'));


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




// Rota para a página de cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Rota para processar o formulário de cadastro
app.post('/cadastro', (req, res) => {

    const {nome, matricula, cargo, senha} = req.body

    if (verificarSeMatriculaValida(res, req, nome, matricula, cargo, senha)){
        cadastrarADM(res, req, nome, matricula, cargo, senha)
    }
})

function verificarSeMatriculaValida(res, req, nome, matricula, cargo, senha){
    let valida = true
    const verificaMatriculaSql = 'SELECT COUNT(*) AS count FROM Administrador WHERE matricula_adm = ?'
    connection.query(verificaMatriculaSql, [matricula], (err, result) => {

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

function cadastrarADM(res, req, nome, matricula, cargo, senha) {
    // Gerar um "sal" (um valor aleatório)
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)

    // Hash da senha com o sal
    const hashSenha = bcrypt.hashSync(senha, salt)

    // Inserir dados no banco de dados
    const sql = 'INSERT INTO Administrador (nome, matricula_adm, cargo, senha_adm_hash) VALUES (?, ?, ?, ?)'

    connection.query(sql, [nome, matricula, cargo, hashSenha], (err, result) => {
        if (err) {
            erroCadastrarADM(err, res)
        }

        else {
            sucessoCadastrarADM(res, nome)
        }
    });
}

function erroCadastrarADM(err, res){
    console.error('Erro ao cadastrar administrador:', err)
    res.status(500).send('Erro ao cadastrar administrador')
}

function sucessoCadastrarADM(res, nome){
    console.log('Administrador cadastrado com sucesso!')
    // Redirecionar para a página 'inserir_problema.ejs'
    res.render('inserir_problema', { nome })
}


app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
