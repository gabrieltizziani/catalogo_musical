const express = require('express');
const router = express.Router();

const artistaRoutes = require('./artistaRoutes');
const discoRoutes = require('./discoRoutes');
const generoRoutes = require('./generoRoutes');
const discoModel = require('../model/discoModel');

// Página inicial
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/cadastrar/disco', (req, res) => {
    res.render('cadastrarDisco');
});


router.get('/cadastrar/genero', (req, res) => {
    res.render('cadastrarGenero');
});

router.get('/cadastrar/artista', async (req, res) => {
    try {
        const generos = await Genero.findAll();  // Obtendo gêneros para o select
        const discos = await Disco.findAll();  // Obtendo discos para o select
        const artistas = await Artista.findAll({ include: ['genero', 'discos'] }); // Para listar os artistas existentes

        res.render('cadastrarArtista', { generos, discos, artistas }); // Passando os dados para a view
    } catch (error) {
        res.status(500).send('Erro ao carregar a página de cadastro');
    }
});

// Usando as rotas
router.use('/api', artistaRoutes);
router.use('/api', discoRoutes);
router.use('/api', generoRoutes);


module.exports = router;