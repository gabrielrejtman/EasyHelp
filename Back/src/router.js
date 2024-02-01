const express = require('express');
const loginController = require('./controllers/loginController');
const cadastroController = require('./controllers/cadastroController');
const cadastroProblemaController = require('./controllers/cadastroProblmemaController')

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json()); // Adicionando middleware para suportar JSON no corpo da solicitação
router.use(express.static('public'));




// Rota para a página de login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => loginController.login(req, res));



// Rota para a página de cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.post('/cadastro', (req, res) => cadastroController.cadastrarADM(req, res));



// Cadastrar Problema
router.get('/cadastrar_problema', (req, res) =>{
    res.render('cadastrar_problema')
})

router.post('/cadastrar_problema', (req, res) => cadastroProblemaController.cadastrarProblema(req, res))


module.exports = router;