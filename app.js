const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const routes = require('./routes');


const app = express();

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Garante compatibilidade em diferentes sistemas

// Middleware para arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Para imagens de capa
app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estáticos

// Middlewares para leitura do corpo da requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do multer para uploads
const upload = multer({
    dest: path.join(__dirname, 'uploads'),
    limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2 MB
});
app.use(upload.single('capa')); // Middleware para receber arquivos no campo "capa"

// Uso de rotas centralizadas
app.use(routes);

// Middleware para tratamento de erros globais
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ocorreu um erro no servidor.');
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
