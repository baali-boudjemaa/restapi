module.exports = (sequelize, Sequelize) => {
    return sequelize.define("cart", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        }
        ,
        uid: {
            type: Sequelize.STRING
        },
        itemID: {
            type: Sequelize.STRING
        },

        productID: {
            type: Sequelize.STRING
        },

    });
};