module.exports = (sequelize, Sequelize) => {
    return sequelize.define("userv", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        }
        ,
        uid: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING
        },

        password : {
            type: Sequelize.STRING
        }
        ,

        image: {
            type: Sequelize.STRING
        }
    });
};