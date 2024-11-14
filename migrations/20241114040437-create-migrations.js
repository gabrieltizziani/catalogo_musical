'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Tabela Generos
        await queryInterface.createTable('generos', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });

        // Tabela Artistas
        await queryInterface.createTable('artistas', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            nomeArtista: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            generoId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'generos',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
        });

        // Tabela Discos
        await queryInterface.createTable('discos', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            anoLancamento: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            capa: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        });

        // Tabela Faixas
        await queryInterface.createTable('faixas', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            duracao: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            numeroFaixa: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            discoId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'discos',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        });

        // Tabela ArtistaDiscos (tabela de associação)
        await queryInterface.createTable('ArtistaDiscos', {
            artistaId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'artistas',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            discoId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'discos',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        });

        // Tabela DiscoGeneros (tabela de associação)
        await queryInterface.createTable('DiscoGeneros', {
            discoId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'discos',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            generoId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'generos',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('DiscoGeneros');
        await queryInterface.dropTable('ArtistaDiscos');
        await queryInterface.dropTable('faixas');
        await queryInterface.dropTable('discos');
        await queryInterface.dropTable('artistas');
        await queryInterface.dropTable('generos');
    },
};
