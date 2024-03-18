const host = "localhost";
const protocol = "https";
const port = 9200;
const auth = "admin:EHOSp@ul0";

import {Client} from "@opensearch-project/opensearch"

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


// Tests
// Setup
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
const indexName = 'teste5'
const term = "problema de"

async function createIndex() {
    try {
        const response = await client.indices.create({
            index: indexName,
            body: {
                mappings: {
                    properties: {
                        title: {
                            type: "text",
                            analyzer: "standard",
                        },
                        description: {
                            type: "text",
                            analyzer: "standard",
                        },
                        difficulty: {
                            type: "keyword",
                        },
                        category: {
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


async function indexAllProblems(){
    // Read the problems from database
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


    // Index the problems in OpenSearch
    try {
        await client.helpers.bulk({
            datasource: problems,
            onDocument(_){
                return { index: {_index: indexName}}
            }
        })
        console.log("Problemas indexados com sucesso no OpenSearch.");
    } catch (error) {
        console.error("Erro ao indexar problemas no OpenSearch:", error);
    }
}


createIndex()
//indexAllProblems()
