module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('city', {
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

    return City;
}