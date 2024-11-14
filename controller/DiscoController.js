const { Disco, Artista, Genero, Faixa } = require('../model');
const { Op } = require('sequelize');

const DiscoController = {
// Controller de Disco
async cadastrarDisco(req, res) {
    try {
        const { titulo, anoLancamento, capa, faixas, generoIds, artistaIds } = req.body;
    
        // Cria o disco
        const novoDisco = await Disco.create({ titulo, anoLancamento, capa });
    
        // Associa artistas ao disco
        if (artistaIds && artistaIds.length > 0) {
            const artistas = await Artista.findAll({ where: { id: artistaIds } });
            await novoDisco.addArtistas(artistas);  // Adiciona os artistas ao disco
        }
    
        // Associa gêneros ao disco
        if (generoIds && generoIds.length > 0) {
            const generos = await Genero.findAll({ where: { id: generoIds } });
            await novoDisco.addGeneros(generos);
        }
    
        // Cria e associa faixas ao disco, se fornecidas
        if (faixas && faixas.length > 0) {
            for (const faixa of faixas) {
                if (!faixa.titulo || !faixa.duracao) {
                    return res.status(400).json({
                        error: 'Erro ao cadastrar disco',
                        message: 'Cada faixa deve conter um título e duração'
                    });
                }
                await Faixa.create({
                    titulo: faixa.titulo,
                    duracao: faixa.duracao,
                    numeroFaixa: faixa.numeroFaixa,
                    discoId: novoDisco.id
                });
            }
        }
    
        // Recupera o disco com faixas, gêneros e artistas associados
        const discoComAssociacoes = await Disco.findByPk(novoDisco.id, {
            include: [
                { model: Genero, as: 'Generos' },
                { model: Faixa, as: 'faixas' },
                { model: Artista, as: 'artistas' }  // Inclui artistas associados ao disco
            ]
        });
    
        res.status(201).json(discoComAssociacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar disco', message: error.message });
    }
},


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

    async editarDisco(req, res) {
        try {
            const { id } = req.params;
            const { titulo, anoLancamento, capa, generoIds } = req.body;

            const disco = await Disco.findByPk(id);
            if (!disco) {
                return res.status(404).json({ error: 'Disco não encontrado' });
            }

            await disco.update({ titulo, anoLancamento, capa });

            // Atualiza associações de gênero, se fornecidas
            if (generoIds) {
                const generos = await Genero.findAll({ where: { id: generoIds } });
                await disco.setGeneros(generos);
            }

            // Recupera o disco atualizado com todas as associações
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
    }
};

module.exports = DiscoController;
