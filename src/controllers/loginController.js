const loginModels = require('../models/loginModels');

const getDataUser = async (req, res) => {
   const dataUser = await loginModels.getDataUser(req, res);

   return res.status(200).json(dataUser);
}

module.exports = {
    getDataUser
};