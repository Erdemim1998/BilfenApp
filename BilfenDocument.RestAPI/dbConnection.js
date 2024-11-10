module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Erdem1998",
    DB: "documentapp",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}