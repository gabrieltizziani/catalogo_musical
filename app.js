const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const routes = require('./routes');

// Configuração do EJS
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Caminho onde as imagens serão armazenadas
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nome único para o arquivo
    }
});
const upload = multer({ storage: storage });

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
