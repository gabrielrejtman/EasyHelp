const connection = require("./connection");

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
            })
        })
    }

    getProblems().then((problems) => {
        res.render('menu', { problems })

    }).catch((err) => {console.error(err)
    }).finally(() => {connection.end()})
}

module.exports = {renderizarMenu}