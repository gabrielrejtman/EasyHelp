const connection = require("./connection")

function getProblems(callback) {
    const problemsQuery = 'SELECT * FROM problema'

    connection.query(problemsQuery, (err, results) => {
        if (err) {
            console.error(err)

            callback(err, null)
        }
        else {
            callback(null, results)
        }
    })
}

module.exports = {
    getProblems
};
