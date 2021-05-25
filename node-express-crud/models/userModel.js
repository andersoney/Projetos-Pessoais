const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
let moment = require('moment');
const config = require('../config')
const sequelize = new Sequelize(config.databaseConfig);
class UserModel extends Model {
    async validPassword(password) {
        return await bcrypt.compare(password, this.password);;
    }
    async generateHash() {
        this.password = await bcrypt.hash(this.password, config.bcryptsConfig.saltOrRounds);
        this.save();
    }
    toJSON() {
        var values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }
    timeExpiration() {
        this.expiration = moment().add(4, 'hour').toDate();
    }
}

UserModel.init({
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
        // allowNull defaults to true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'UserModel' // We need to choose the model name
});
(async () => {
    await sequelize.sync(config.sequelizeConfig.sync);
    // Code here
})();
module.exports = UserModel;