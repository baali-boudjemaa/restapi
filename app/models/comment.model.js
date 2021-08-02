module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        name: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.STRING
        }
    });

    return Comment;
};