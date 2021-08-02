module.exports = (sequelize, Sequelize) => {
    return sequelize.define("userv", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        username: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING
        }
        ,

        image: {
            type: Sequelize.STRING
        }
    });
};