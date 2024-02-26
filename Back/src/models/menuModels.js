const connection = require("./connection");
const problemModels = require("./cadastroProblemaModels");

function getProblems(callback) {
    problemModels.readProblemas((err, resultados) => {
        if (err) {
            callback(err, null);
            return;
        }

        callback(null, resultados);
    });
}

module.exports = {
    getProblems
};
