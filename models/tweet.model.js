module.exports = (sequelize, Sequelize) => {
    const tweet = sequelize.define("tweets", {
        title: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.STRING
        },
    })
    return tweet;
}