module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        PasswordHash: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ImagePath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        TCKN: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        MotherName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FatherName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BirthDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CivilStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EmploymentDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MilitaryStatus: {
            type: DataTypes.STRING,
            allowNull: true
        },
        PostponementDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        CreatedAt: 'CreatedAt',
        UpdatedAt: 'UpdatedAt'
    });

    return User;
}