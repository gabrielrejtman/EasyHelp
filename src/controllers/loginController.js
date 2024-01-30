const loginModels = require('../models/loginModels');

const getDataUser = async (req, res) => {
   const dataUser = await loginModels.getDataUser();

   return res.status(200).json({"sexo": 'sim'});
}

module.exports = {
    getDataUser
};