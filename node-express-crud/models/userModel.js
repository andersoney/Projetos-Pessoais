module.exports = async (constant) => {
    sequelize = constant.sequelize;
    const { DataTypes, Model } = require('sequelize');
    class User extends Model { }

    User.init({
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
            // allowNull defaults to true
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User' // We need to choose the model name
    });
    (async () => {
        await sequelize.sync({ force: true });
        // Code here
    })();
    return User;
}