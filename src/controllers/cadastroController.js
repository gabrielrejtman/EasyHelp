const cadastroModels = require('../models/cadastroModels')

const getDataUser = (req, res) => {
    const dataUser = cadastroModels.getDataUser(req, res);

    return res.status(200).json(dataUser);
}

module.exports = {
    getDataUser
};