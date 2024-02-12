import * as loginModels from '../models/loginModels.js';

export const getDataUser = (req, res) => {
   const createdLogin = loginModels.findLogin(req.body);

   return res.status(201).json(createdLogin);
}


