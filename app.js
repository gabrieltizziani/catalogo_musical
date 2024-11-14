const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');  // Importando as rotas

// Middlewares
app.use(bodyParser.json());  // Para ler dados JSON no corpo da requisição

// Usando as rotas
app.use(routes);

// Definindo a porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
