// Faixa model
module.exports = (sequelize, DataTypes) => {
    const Faixa = sequelize.define('Faixa', {
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
        duracao: {
            type: DataTypes.STRING, // Formato de tempo, pode ser 'mm:ss' ou um valor em segundos
            allowNull: false,
        },
        // Campo opcional para ordem da faixa em um disco
        numeroFaixa: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'faixas',
        timestamps: false
    });

    // Definindo a associação com Disco
    Faixa.associate = (models) => {
        Faixa.belongsTo(models.Disco, { foreignKey: 'discoId', as: 'disco' });
    };

    return Faixa;
};
