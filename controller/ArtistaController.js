const { Artista, Disco } = require('../model');

const ArtistaController = {
    async cadastrarArtista(req, res) {
        try {
            const { nomeArtista, generoId, discoIds } = req.body;

            // Cria o artista
            const novoArtista = await Artista.create({ nomeArtista, generoId });

            // Associa discos, se fornecidos
            if (discoIds && discoIds.length > 0) {
                const discos = await Disco.findAll({ where: { id: discoIds } });
                await novoArtista.addDiscos(discos);
            }

            res.status(201).json(novoArtista);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao cadastrar artista', message: error.message });
        }
    },

    async listarArtistas(req, res) {
        try {
            const artistas = await Artista.findAll({
                include: [{ model: Disco, as: 'discos' }]
            });
            res.status(200).json(artistas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar artistas', message: error.message });
        }
    },

    async editarArtista(req, res) {
        try {
            const { id } = req.params;
            const { nomeArtista, generoId } = req.body;

            const artista = await Artista.findByPk(id);
            if (!artista) {
                return res.status(404).json({ error: 'Artista não encontrado' });
            }

            await artista.update({ nomeArtista, generoId });
            res.status(200).json(artista);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao editar artista', message: error.message });
        }
    },

    async excluirArtista(req, res) {
        try {
            const { id } = req.params;
            const artista = await Artista.findByPk(id);
            if (!artista) {
                return res.status(404).json({ error: 'Artista não encontrado' });
            }

            await artista.destroy();
            res.status(200).json({ message: 'Artista excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir artista', message: error.message });
        }
    }
};

module.exports = ArtistaController;
