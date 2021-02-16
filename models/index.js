const { Sequelize } = require('sequelize');
const env = process.env;

const sequelize = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    operatorsAliases: false,

    pool: {
        max: 3,
        min: 0,
        acquire: env.DB_ACQUIRE_POOL,
        idle: env.DB_IDLE_POOL   
    }
});

// load model
const users = require("./user.model")(sequelize, Sequelize)
const tweets = require("./tweet.model")(sequelize, Sequelize)

module.exports = {
    Sequelize,
    sequelize,
    // Below is models that we must defined first
    users,
    tweets
}