import { connection } from './connection.js';
import * as bcrypt from 'bcrypt';


export const getAllRegisters = async () => {
    const [registers] = await connection.execute('SELECT * FROM administrador');

    return registers;
}


export const createRegister = async (register) => {
    const { nome, matricula, cargo, senha } = register;

    const salt = bcrypt.genSaltSync(10);

    // Hash da senha com o sal
    const hashSenha = bcrypt.hashSync(senha, salt)

    // Inserir dados no banco de dados
    const query = 'INSERT INTO administrador (nome, matricula_adm, cargo, senha_adm_hash) VALUES (?, ?, ?, ?)';

    const [createdRegister] = await connection.execute(query, [nome, matricula, cargo, hashSenha]);

    return {createdRegister};
}

export const deleteRegister = async (matricula) => {

    const query = 'DELETE FROM administrador WHERE matricula_adm = ?';
    const [removedRegister] = await connection.execute(query, [matricula]);

    return removedRegister;
}

export const authenticateUser = async (id) => {
    const { matricula, senha } = id;

    const query = 'SELECT * FROM administrador WHERE matricula_adm AND senha_adm_hash = (?, ?)';

    const [[user]] = await connection.execute(query, [matricula, senha]);

    return user;
}