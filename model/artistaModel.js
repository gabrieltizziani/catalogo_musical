module.exports = (sequelize, DataTypes) => {
    const Artista = sequelize.define('Artista', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nomeArtista: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'artistas',
        timestamps: false
    });

    // Unificando as associações dentro de uma única função
    Artista.associate = (models) => {
        Artista.belongsToMany(models.Disco, { 
            through: 'ArtistaDiscos', 
            foreignKey: 'artistaId', 
            as: 'discos',  // Definindo o alias como 'discos'
            timestamps: false
        });
        Artista.belongsTo(models.Genero, { 
            foreignKey: 'generoId', 
            as: 'genero' 
        });
    };
    

    return Artista;
};