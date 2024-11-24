const { Disco, Artista, Genero, Faixa } = require('../model');
const { Op } = require('sequelize');

const DiscoController = {
    // Controller para cadastrar Disco
    async cadastrarDisco(req, res) {
        try {
            const { titulo, anoLancamento, capa, faixas, generoIds, artistaIds } = req.body;

            // Cria o disco
            const novoDisco = await Disco.create({ titulo, anoLancamento, capa });

            // Associa artistas ao disco
            if (artistaIds && artistaIds.length > 0) {
                const artistas = await Artista.findAll({ where: { id: artistaIds } });
                await novoDisco.addArtistas(artistas);
            }

            // Associa gêneros ao disco
            if (generoIds && generoIds.length > 0) {
                const generos = await Genero.findAll({ where: { id: generoIds } });
                await novoDisco.addGeneros(generos);
            }

            // Cria e associa faixas ao disco, se fornecidas
            if (faixas && faixas.trim().length > 0) {
                const faixaArray = faixas.split('\n');
                for (const faixa of faixaArray) {
                    const match = faixa.match(/faixa (\d+) - ([0-9:]+)/i);
                    if (match) {
                        await Faixa.create({
                            titulo: `Faixa ${match[1]}`,
                            duracao: match[2],
                            numeroFaixa: match[1],
                            discoId: novoDisco.id
                        });
                    }
                }
            }

            const discoComAssociacoes = await Disco.findByPk(novoDisco.id, {
                include: [
                    { model: Genero, as: 'Generos' },
                    { model: Faixa, as: 'faixas' },
                    { model: Artista, as: 'artistas' }
                ]
            });

            res.status(201).json(discoComAssociacoes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao cadastrar disco', message: error.message });
        }
    },

    // Listar discos
    async listarDiscos(req, res) {
        try {
            const discos = await Disco.findAll({
                include: [
                    { model: Artista, as: 'artistas' },
                    { model: Genero, as: 'Generos' },
                    { model: Faixa, as: 'faixas' }
                ]
            });
            res.status(200).json(discos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar discos', message: error.message });
        }
    },

    // Buscar discos
    async buscarDiscos(req, res) {
        try {
            const { titulo, artista, genero } = req.query;
            const whereClause = {};

            if (titulo) {
                whereClause.titulo = { [Op.like]: `%${titulo}%` };
            }

            const discos = await Disco.findAll({
                where: whereClause,
                include: [
                    {
                        model: Artista,
                        as: 'artistas',
                        where: artista ? { nomeArtista: { [Op.like]: `%${artista}%` } } : undefined,
                        required: !!artista
                    },
                    {
                        model: Genero,
                        as: 'Generos',
                        where: genero ? { nome: { [Op.like]: `%${genero}%` } } : undefined,
                        required: !!genero
                    },
                    { model: Faixa, as: 'faixas' }
                ]
            });

            res.status(200).json(discos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar discos', message: error.message });
        }
    },

    // Editar disco
    async editarDisco(req, res) {
        try {
            const { id } = req.params;
            const { titulo, anoLancamento, capa, generoIds } = req.body;

            const disco = await Disco.findByPk(id);
            if (!disco) {
                return res.status(404).json({ error: 'Disco não encontrado' });
            }

            await disco.update({ titulo, anoLancamento, capa });

            if (generoIds) {
                const generos = await Genero.findAll({ where: { id: generoIds } });
                await disco.setGeneros(generos);
            }

            const discoAtualizado = await Disco.findByPk(id, {
                include: [
                    { model: Artista, as: 'artistas' },
                    { model: Genero, as: 'Generos' },
                    { model: Faixa, as: 'faixas' }
                ]
            });

            res.status(200).json(discoAtualizado);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao editar disco', message: error.message });
        }
    },

    // Excluir disco
    async excluirDisco(req, res) {
        try {
            const { id } = req.params;
            const disco = await Disco.findByPk(id);
            if (!disco) {
                return res.status(404).json({ error: 'Disco não encontrado' });
            }

            await disco.destroy();
            res.status(200).json({ message: 'Disco excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir disco', message: error.message });
        }
    },

    // Buscar disco por ID
    async buscarDiscoPorId(req, res) {
        try {
            const { id } = req.params;
            const disco = await Disco.findByPk(id, {
                include: [
                    { model: Artista, as: 'artistas' },
                    { model: Genero, as: 'Generos' },
                    { model: Faixa, as: 'faixas' }
                ]
            });

            if (!disco) {
                return res.status(404).json({ error: 'Disco não encontrado' });
            }

            res.status(200).json(disco);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar disco', message: error.message });
        }
    },

    // Renderizar cadastro de disco
    async renderCadastrarDisco(req, res) {
        try {
            const artistas = await Artista.findAll();
            const generos = await Genero.findAll();

            res.render('cadastrar-disco', { artistas, generos });
        } catch (error) {
            res.status(500).send('Erro ao carregar dados: ' + error.message);
        }
    },
};

module.exports = DiscoController;
