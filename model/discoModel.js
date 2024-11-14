// Disco model
module.exports = (sequelize, DataTypes) => {
    const Disco = sequelize.define('Disco', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        anoLancamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        capa: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
    }, {
        tableName: 'discos',
        timestamps: false
    });

    // Definindo as associações para Disco
    Disco.associate = (models) => {
        // Associação muitos-para-muitos com Artista
        Disco.belongsToMany(models.Artista, { through: 'ArtistaDiscos', foreignKey: 'discoId' });

        // Associação muitos-para-muitos com Genero (caso um disco possa pertencer a vários gêneros)
        Disco.belongsToMany(models.Genero, { through: 'DiscoGeneros', foreignKey: 'discoId' });

        // Caso exista uma relação para faixas individuais
        Disco.hasMany(models.Faixa, { foreignKey: 'discoId', as: 'faixas' });
    };

    return Disco;
};
