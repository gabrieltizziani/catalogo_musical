const express = require('express');
const router = express.Router();
const DiscoController = require('../controller/DiscoController');

// Rotas para o Disco
router.post('/discos', DiscoController.cadastrarDisco);        // Cadastrar um novo disco
router.get('/discos', DiscoController.listarDiscos);          // Listar todos os discos
router.get('/discos/buscar', DiscoController.buscarDiscos);   // Buscar discos por filtros (titulo, artista, genero)
router.put('/discos/:id', DiscoController.editarDisco);        // Editar um disco
router.delete('/discos/:id', DiscoController.excluirDisco);    // Excluir um disco

module.exports = router;
