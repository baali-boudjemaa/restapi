module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("people", {
        username: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING
        }
    });
    return User;
};