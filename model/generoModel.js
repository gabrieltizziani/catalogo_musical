module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define('Genero', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'generos',
        timestamps: false
    });
    
    return Genero;
};