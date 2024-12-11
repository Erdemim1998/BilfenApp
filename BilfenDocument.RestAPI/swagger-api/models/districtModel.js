module.exports = (sequelize, DataTypes) => {
    const District = sequelize.define('district', {
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

    return District;
}