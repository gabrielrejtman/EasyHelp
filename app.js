const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const app = express();
const port = 3300; // substituir por porta usada no servidor local
app.use(express.static('public'));

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

// Seta Ejs como mecanismo padrão
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Rota para a página de cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Rota para processar o formulário de cadastro
app.post('/cadastro', (req, res) => {
    const { nome, matricula, cargo, senha } = req.body;

    // Gerar um "sal" (um valor aleatório)
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    // Hash da senha com o sal
    const hashSenha = bcrypt.hashSync(senha, salt);

    // Inserir dados no banco de dados
    const sql = 'INSERT INTO Administrador (nome, matricula_adm, cargo, senha_adm_hash) VALUES (?, ?, ?, ?)';
    connection.query(sql, [nome, matricula, cargo, hashSenha], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar administrador:', err);
            res.status(500).send('Erro ao cadastrar administrador');
        } else {
            console.log('Administrador cadastrado com sucesso!');
            // Redirecionar para a página 'inserir_problema.ejs'
            res.render('inserir_problema', { nome });
        }
    });
});

// Rota para a página de login (quando o usuário ja possui conta)
app.get('/login', (req, res) => {
    res.render('login');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
