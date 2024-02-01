const app = require('./app');

const port = 3300 // substituir por porta usada no servidor local
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});