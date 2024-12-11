module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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

    return Role;
}