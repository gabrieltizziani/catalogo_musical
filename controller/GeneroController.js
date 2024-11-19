const { Genero } = require('../model');

const GeneroController = {
    async cadastrarGenero(req, res) {
        try {
            const { nome } = req.body;
            const novoGenero = await Genero.create({ nome });
            res.status(201).json(novoGenero);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao cadastrar gênero', message: error.message });
        }
    },

    async listarGeneros(req, res) {
        try {
            const generos = await Genero.findAll();
            res.status(200).json(generos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar gêneros', message: error.message });
        }
    },

    async editarGenero(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;

            const genero = await Genero.findByPk(id);
            if (!genero) {
                return res.status(404).json({ error: 'Gênero não encontrado' });
            }

            await genero.update({ nome });
            res.status(200).json(genero);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao editar gênero', message: error.message });
        }
    },

    async buscarGeneroPorId(req, res) {
        try {
            const { id } = req.params;

            // Busca o gênero pelo ID
            const genero = await Genero.findByPk(id);
            if (!genero) {
                return res.status(404).json({ error: 'Gênero não encontrado' });
            }

            res.status(200).json(genero);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar gênero', message: error.message });
        }
    },

    async excluirGenero(req, res) {
        try {
            const { id } = req.params;
            const genero = await Genero.findByPk(id);
            if (!genero) {
                return res.status(404).json({ error: 'Gênero não encontrado' });
            }

            await genero.destroy();
            res.status(200).json({ message: 'Gênero excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir gênero', message: error.message });
        }
    }
};

module.exports = GeneroController;
