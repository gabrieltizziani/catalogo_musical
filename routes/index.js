const express = require('express');
const router = express.Router();

const artistaRoutes = require('./artistaRoutes');
const discoRoutes = require('./discoRoutes');
const generoRoutes = require('./generoRoutes');
const discoModel = require('../model/discoModel');

router.use('/api', artistaRoutes);  // API de artistas
router.use('/api', discoRoutes);    // API de discos
router.use('/api', generoRoutes);   // API de gêneros

// Rotas para páginas (apenas renderizações)
router.get('/cadastrar/artista', (req, res) => {
    res.render('cadastrarArtista');
});
router.get('/cadastrar/disco', (req, res) => {
    res.render('cadastrarDisco');
});
router.get('/cadastrar/genero', (req, res) => {
    res.render('cadastrarGenero');
});

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;