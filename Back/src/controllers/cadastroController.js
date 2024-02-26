const cadastroModels = require('../models/cadastroModels')

const cadastrarADM = (req, res) => {
    cadastroModels.cadastrarADM(req, res, (err, success) => {
        if (success) {
            return res.redirect('/menu')
        }

        if (err){
            return res.status(500).send('Erro durante o cadastro: ' + err)
        }
    })
}

module.exports = {
    cadastrarADM
};