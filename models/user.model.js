const bcrypt = require('bcryptjs')

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("users", {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,


            // Function to automatically hash the password with bcryptjs
            set(value) {
                this.setDataValue('password', bcrypt.hashSync(value))
            }
        },
    }, {
    })

    // In here, we hide the password attribute from model instance
    // We still can access the password, but http req cline (Postman, Insomnia) can't see it
    user.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());

        delete values.password;
        return values;
    }
    return user;
}