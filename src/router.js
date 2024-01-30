const express = require('express');
const loginController = require('./controllers/loginController');

const router = express.Router();

// Rota para a página de login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', loginController.getDataUser);

// Rota para a página de cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.post('/cadastro', (req, res) => {

});

module.exports = router;