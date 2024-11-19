const express = require('express');
const router = express.Router();
const DiscoController = require('../controller/DiscoController');

// Página para cadastrar disco
router.get('/cadastro/disco', (req, res) => {
    res.render('discoCadastro');
});

// Rotas para o Disco
router.post('/discos', DiscoController.cadastrarDisco);        // Cadastrar um novo disco
router.get('/discos', DiscoController.listarDiscos);          // Listar todos os discos
router.get('/discos/buscar', DiscoController.buscarDiscos);   // Buscar discos por filtros (titulo, artista, genero)
router.get('/discos/:id', DiscoController.buscarDiscoPorId);
router.put('/discos/:id', DiscoController.editarDisco);        // Editar um disco
router.delete('/discos/:id', DiscoController.excluirDisco);    // Excluir um disco

module.exports = router;
