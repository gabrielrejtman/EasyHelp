const { Client } = require('@elastic/elasticsearch');

const opensearchClient = new Client({
    node: 'http://localhost:9200', // Atualize com as informações do seu container Docker
    log: 'trace', // Ajuste o nível de log conforme necessário
});

module.exports = opensearchClient;