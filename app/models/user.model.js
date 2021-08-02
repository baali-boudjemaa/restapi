module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
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
    return User;
};