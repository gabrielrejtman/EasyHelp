const menuModels = require('../models/menuModels');

const renderMenuPage = (req, res) => {
    menuModels.getProblems((err, problems) => {
        if (err) {
            console.log('Erro ao buscar problemas:', err);
            res.status(500).send('Erro ao buscar problemas');
            return;
        }

        res.render('menu', { problems });
    });
};

module.exports = {
    renderMenuPage
};
