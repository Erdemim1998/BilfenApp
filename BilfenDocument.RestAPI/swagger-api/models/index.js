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
db.countries = require('./countryModel.js')(sequelize, DataTypes);
db.cities = require('./cityModel.js')(sequelize, DataTypes);
db.districts = require('./districtModel.js')(sequelize, DataTypes);

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

db.countries.hasMany(db.users, {
    foreignKey: {
        name: 'CountryId',
        allowNull: false
    },
    as: 'users'
});

db.users.belongsTo(db.countries, {
    foreignKey: {
        name: 'CountryId',
        allowNull: false
    },
    as: 'Country'
});

db.countries.hasMany(db.cities, {
    foreignKey: {
        name: 'CountryId',
        allowNull: false
    },
    as: 'cities'
});

db.cities.belongsTo(db.countries, {
    foreignKey: {
        name: 'CountryId',
        allowNull: false
    },
    as: 'Country'
});

db.cities.hasMany(db.users, {
    foreignKey: {
        name: 'CityId',
        allowNull: false
    },
    as: 'users'
});

db.users.belongsTo(db.cities, {
    foreignKey: {
        name: 'CityId',
        allowNull: false
    },
    as: 'City'
});

db.cities.hasMany(db.districts, {
    foreignKey: {
        name: 'CityId',
        allowNull: false
    },
    as: 'districts'
});

db.districts.belongsTo(db.cities, {
    foreignKey: {
        name: 'CityId',
        allowNull: false
    },
    as: 'City'
});

db.districts.hasMany(db.users, {
    foreignKey: {
        name: 'DistrictId',
        allowNull: false
    },
    as: 'users'
});

db.users.belongsTo(db.districts, {
    foreignKey: {
        name: 'DistrictId',
        allowNull: false
    },
    as: 'District'
});

db.sequelize.sync({ alter: true, force: false })
    .then(() => {
        console.log("Tables and relations was created successfully!");
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    });

module.exports = db;