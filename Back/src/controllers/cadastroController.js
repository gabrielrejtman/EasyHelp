const cadastroModels = require('../models/cadastroModels')

const cadastrarADM = (req, res) => {
    cadastroModels.cadastrarADM(req, res);

}

module.exports = {
    cadastrarADM
};