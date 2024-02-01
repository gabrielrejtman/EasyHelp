const cadastroProblemaModels = require('../models/cadastroProblemaModels');

const cadastrarProblema = (req, res) => {
    cadastroProblemaModels.cadastrarProblema(req, res)
}

module.exports = {
    cadastrarProblema
};