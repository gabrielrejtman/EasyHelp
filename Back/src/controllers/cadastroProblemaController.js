const cadastroProblemaModels = require('../models/cadastroProblemaModels');

const cadastrarProblema = async (req, res) => {
    const result = await cadastroProblemaModels.cadastrarProblema(req.body)

    res.status(201).json(result);
}

module.exports = {
    cadastrarProblema
};
