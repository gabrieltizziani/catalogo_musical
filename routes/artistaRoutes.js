const express = require('express');
const router = express.Router();
const ArtistaController = require('../controller/ArtistaController');

// Rotas para o Artista
router.post('/artistas', ArtistaController.cadastrarArtista);  // Cadastrar um novo artista
router.get('/artistas', ArtistaController.listarArtistas);    // Listar todos os artistas
router.put('/artistas/:id', ArtistaController.editarArtista);  // Editar um artista
router.delete('/artistas/:id', ArtistaController.excluirArtista);  // Excluir um artista

module.exports = router;
