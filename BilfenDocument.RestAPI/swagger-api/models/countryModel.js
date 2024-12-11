module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('country', {
        Id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true,
        CreatedAt: 'CreatedAt',
        UpdatedAt: 'UpdatedAt'
    });

    return Country;
}