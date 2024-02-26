const cadastroProblemaModels = require('../models/cadastroProblemaModels');

const cadastrarProblema = (req, res) => {
    cadastroProblemaModels.cadastrarProblema(req, res)
    res.redirect('/menu')
}

module.exports = {
    cadastrarProblema
};