import * as express from 'express';
import * as loginController from './controllers/loginController.js';
import * as cadastroController from './controllers/cadastroController.js'


export const router = express.Router();

// Rota para a página de login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', loginController.getDataUser);


// Rota para a página de cadastro
router.get('/cadastro', cadastroController.getAllRegisters);



router.post('/cadastro', cadastroController.createRegister);

router.delete('/cadastro/:matricula', cadastroController.deleteRegister);

// Rota de autenticacao

router.post('/authenticate', cadastroController.authenticateUser)