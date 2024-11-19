const express = require('express');
const router = express.Router();
const GeneroController = require('../controller/GeneroController');

// Rotas para o Gênero
router.post('/generos', GeneroController.cadastrarGenero);    // Cadastrar um novo gênero
router.get('/generos', GeneroController.listarGeneros);      // Listar todos os gêneros
router.get('/generos/:id', GeneroController.buscarGeneroPorId);
router.put('/generos/:id', GeneroController.editarGenero);    // Editar um gênero
router.delete('/generos/:id', GeneroController.excluirGenero);  // Excluir um gênero

module.exports = router;
