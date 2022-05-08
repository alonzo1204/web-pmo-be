const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class userRolModel extends Model{}

userRolModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id:{
        type:DataTypes.INTEGER,
        defaultValue: null
    },
    role_id:{
        type:DataTypes.INTEGER,
        defaultValue: null
    },
},{
    freezeTableName: true,
    sequelize, modelName:"user_rol"
});


module.exports = {
    userRolModel
}