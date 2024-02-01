const loginModels = require('../models/loginModels');

const getDataUser = (req, res) => {
   const dataUser = loginModels.getDataUser(req, res);

   return res.status(200).json(dataUser);
}

module.exports = {
    getDataUser
};