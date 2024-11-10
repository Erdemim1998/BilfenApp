const dbConfig = require('../../dbConnection.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: 3308,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        charset: "utf8mb4",
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.roles = require('./roleModel.js')(sequelize, DataTypes);
db.users = require('./userModel.js')(sequelize, DataTypes);
db.documents = require('./documentModel.js')(sequelize, DataTypes);

db.roles.hasMany(db.users, {
    foreignKey: {
        name: 'RoleId',
        allowNull: false
    },
    as: 'users'
});

db.users.belongsTo(db.roles, {
    foreignKey: {
        name: 'RoleId',
        allowNull: false
    },
    as: 'Role'
});

db.users.hasMany(db.documents, {
    foreignKey: {
        name: 'UserId',
        allowNull: false
    },
    as: 'documents'
});

db.documents.belongsTo(db.users, {
    foreignKey: {
        name: 'UserId',
        allowNull: false
    },
    as: 'User'
});

db.sequelize.sync({ alter: true, force: false })
    .then(() => {
        console.log("Tables and relations was created successfully!");
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    });

module.exports = db;