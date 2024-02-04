const loginModels = require('../models/loginModels');

const login = (req, res) => {
   loginModels.login(req, res, (err, success) => {
       if (err){
           return res.status(500).send('Erro durante o login: ' + err)
       }

       if (success) {
           return res.redirect('/menu')
       }
       else {
           return res.status(401).send('Usuário não encontrado ou credenciais inválidas.')
       }
   })
}

module.exports = {
    login
};