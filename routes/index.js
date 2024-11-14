const express = require('express');
const router = express.Router();

const artistaRoutes = require('./artistaRoutes');
const discoRoutes = require('./discoRoutes');
const generoRoutes = require('./generoRoutes');


// Usando as rotas
router.use('/api', artistaRoutes);
router.use('/api', discoRoutes);
router.use('/api', generoRoutes);


module.exports = router;
