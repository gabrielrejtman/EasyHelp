const loginModels = require('../models/loginModels');

const login = (req, res) => {
   loginModels.login(req, res)
}

module.exports = {
    login
};