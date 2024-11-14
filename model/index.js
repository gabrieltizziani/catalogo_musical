const Sequelize = require('sequelize');
const config = require('../config/config.json');

// Pegue as configurações específicas para o ambiente de desenvolvimento
const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    config.development
);

const models = {
    Artista: require('./artistaModel')(sequelize, Sequelize.DataTypes),
    Disco: require('./discoModel')(sequelize, Sequelize.DataTypes),
    Faixa: require('./faixaModel')(sequelize, Sequelize.DataTypes),
    Genero: require('./generoModel')(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
