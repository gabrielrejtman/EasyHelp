const express = require('express');
const loginController = require('./controllers/loginController');
const cadastroController = require('./controllers/cadastroController');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json()); // Adicionando middleware para suportar JSON no corpo da solicitação
router.use(express.static('public'));

// Rota para a página de login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', loginController.getDataUser);

// Rota para a página de cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.post('/cadastro', cadastroController.getDataUser);

module.exports = router;