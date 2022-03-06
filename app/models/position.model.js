module.exports = (sequelize, Sequelize) => {
    return sequelize.define("position", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        }
        ,
        latitude: {
            type: Sequelize.INTEGER
        },
        longitude: {
            type: Sequelize.INTEGER
        },

        altitude: {
            type: Sequelize.INTEGER
        },


    });
};