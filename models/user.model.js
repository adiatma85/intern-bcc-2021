module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("users", {
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING
        },
    })
    return user;
}