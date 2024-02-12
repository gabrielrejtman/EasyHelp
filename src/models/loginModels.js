import { connection } from './connection.js';


export const findLogin = async (login) => {
    const { matricula } = login;

    const query = 'SELECT * FROM administrador WHERE matricula_ADM = ?';

    const [createdLogin] = await connection.execute(query, [matricula]);

    return createdLogin;
}

export const getDataUser = async (req, res) => {
    const dadosLogin = await req.body;
    console.log(dadosLogin)

    const selectUserQuery = 'SELECT * FROM administrador WHERE matricula_ADM = ?';

    connection.query(selectUserQuery, [dadosLogin['matricula']], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            return;
        }


        if (results.length > 0) {
            const usuario = results[0];
            console.log('Usuário encontrado:', usuario);
            renderizarMenu();

        }
        else {
            console.log('Usuário não encontrado');
        }

    });
};

function renderizarMenu(res){
    const problemsQuery = 'SELECT * FROM problema'
    const getProblems = () => {
        return new Promise((resolve, reject) => {
            connection.query(problemsQuery, (err, results) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(results)
                }
                connection.end()
            })
        })
    }

    getProblems().then((problems) => {
            console.log(problems)
            res.render('inserir_problema', { problems });
        }).catch((err) => {
            console.error('Erro ao executar a consulta:', err)
            res.render('inserir_problema', { problems: [] })
        })
}
