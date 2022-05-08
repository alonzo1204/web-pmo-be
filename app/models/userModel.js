const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class userModel extends Model{}

userModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    code:{
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    firstname:{
        type:DataTypes.STRING(150),
        allowNull: false,
    },
    lastname:{
        type:DataTypes.STRING(150),
        allowNull: false,
    },
    weighted_average:{
        type:DataTypes.DECIMAL(10, 2),
        defaultValue: null
    },
    password:{
        type:DataTypes.STRING(200),
        allowNull: false,
    },
    active:{
        type:DataTypes.INTEGER,
        defaultValue: 1
    },
},{
    freezeTableName: true,
    sequelize, modelName:"user"
});


module.exports = {
    userModel
}