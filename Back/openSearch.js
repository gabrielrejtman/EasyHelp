const host = "localhost";
const protocol = "https";
const port = 9200;
const auth = "admin:EHOSp@ul0";


// Create a client with SSL/TLS enabled.
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
    // Handle the error appropriately, like logging to a file or exiting the program
}


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

createIndex();