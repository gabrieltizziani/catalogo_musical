const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');  // Importando as rotas

// Configurando EJS como motor de templates
app.set('view engine', 'ejs');
app.set('views', './views'); // Define o diretório onde as views estarão

// Middlewares
app.use(bodyParser.json());  // Para ler dados JSON no corpo da requisição

// Usando as rotas
app.use(routes);

app.use(express.static('public'));

// Rota inicial
app.get('/', (req, res) => {
    res.render('index'); // Renderiza a página inicial
});

// Definindo a porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
