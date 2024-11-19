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

router.get('/cadastrar/artista', (req, res) => {
    res.render('cadastrarArtista');
});

router.get('/cadastrar/genero', (req, res) => {
    res.render('cadastrarGenero');
});


// Usando as rotas
router.use('/api', artistaRoutes);
router.use('/api', discoRoutes);
router.use('/api', generoRoutes);


module.exports = router;