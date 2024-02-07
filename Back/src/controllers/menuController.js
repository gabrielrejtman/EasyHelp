const menuModels = require('../models/menuModels');

const renderMenuPage = (req, res) => {
    menuModels.getProblems((err, problems) => {
        if (err) {
            return res.status(500).send('Erro ao obter os problemas: ' + err);
        }
        res.status(201).json(problems);
    });
};

module.exports = {
    renderMenuPage
};
