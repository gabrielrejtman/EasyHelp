const host = "localhost";
const protocol = "https";
const port = 9200;
const auth = "admin:EHOSp@ul0";

const { Client } = require("@opensearch-project/opensearch");

try {
    const client = new Client({
        node: protocol + "://" + auth + "@" + host + ":" + port,
        ssl: {
            rejectUnauthorized: false
        },
    });
    // Use the client for interacting with OpenSearch
} catch (error) {
    console.error("Error creating client:", error);
}

// Search
const client = new Client({
    node: "https://localhost:9200",
    auth: {
        username: "admin",
        password: "EHOSp@ul0",
    },
    ssl: {
        rejectUnauthorized: false
    },
});


async function createIndex() {
    try {
        const response = await client.indices.create({
            index: "problema",
            body: {
                mappings: {
                    properties: {
                        titulo: {
                            type: "text",
                            analyzer: "standard",
                        },
                        descricao: {
                            type: "text",
                            analyzer: "standard",
                        },
                        dificuldade: {
                            type: "keyword",
                        },
                        categoria: {
                            type: "keyword",
                        },
                    },
                },
            },
        });
        console.log("Índice criado com sucesso:", response);
    } catch (error) {
        console.error("Erro ao criar índice:", error);
    }
}

// Search
const term = "Falha no ";
const connection = require("./src/models/connection");

function readProblemas(callback) {
    const sql = "SELECT * FROM problema";
    connection.query(sql, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results); // Pass the results to the callback
        }
    });
}

async function indexProblems(){
    // 1. Read the problems from the MySQL database
    const problems = await new Promise((resolve, reject) => {
        readProblemas((error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });


    // 2. Index the problems in OpenSearch
    try {
        await client.helpers.bulk({
            datasource: problems,
            onDocument(_){
                return { index: {_index: "problema"}}
            }
        })
        console.log("Problemas indexados com sucesso no OpenSearch.");
    } catch (error) {
        console.error("Erro ao indexar problemas no OpenSearch:", error);
    }
}

async function searchProblems() {
    try {

        // 3. Search for problems in OpenSearch
        const queries = [
            {},
            {query: { match: { titulo: term} } },
            {},
            {query: { match: { descricao: term} } }
        ]

        const response = await client.msearch({
            index: "problema",
            body: queries
        });

        response.body.responses.map((res) =>
            res.hits.hits.map((problema) => {
                console.log(problema._source.titulo);
            })
        );
    } catch (error) {
        console.error("Erro na execução da pesquisa:", error);
    }
}

searchProblems(); // Call the search function




//searchProblems();