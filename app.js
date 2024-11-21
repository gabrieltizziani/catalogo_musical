const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware para arquivos estáticos
app.use(express.static('public'));

// Middlewares para leitura do corpo da requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Uso de rotas centralizadas
app.use(routes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
