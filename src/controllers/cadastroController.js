import * as cadastroModels from '../models/cadastroModels.js'


export const getAllRegisters = async (_req, res) => {
    const allRegisters = await cadastroModels.getAllRegisters();

    return res.status(201).json(allRegisters);
}

export const createRegister = async (req, res) => {
    const createdRegister = await cadastroModels.createRegister(req.body);
    
    return res.status(201).json(createdRegister);
}

export const deleteRegister = async (req, res) => {
    const { matricula } = req.params;

    await cadastroModels.deleteRegister(matricula);

    return res.status(204).json();
}

export const authenticateUser = async (req, res) => {
    const authenticatedUser = await cadastroModels.authenticateUser(req.body);

    if (!authenticatedUser) {
        return res.status(400).json({
            error: true,
            message: 'User not found'
        })
    }

    return res.status(200).json(authenticatedUser);
}