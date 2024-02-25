const express = require('express');
const loginController = require('./controllers/loginController');
const cadastroController = require('./controllers/cadastroController');
const cadastroProblemaController = require('./controllers/cadastroProblemaController')
const menuController = require('./controllers/menuController')


const router = express.Router();



// Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => loginController.login(req, res));




// Cadastro ADM
router.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

router.post('/cadastro', (req, res) => cadastroController.cadastrarADM(req, res))




// Menu
router.get('/menu', (req, res) => menuController.renderMenuPage(req, res))




// Cadastrar Problema
router.get('/cadastrar_problema', (req, res) =>{
    res.render('cadastrar_problema')
})

router.post('/cadastrar_problema', cadastroProblemaController.cadastrarProblema)



module.exports = router
