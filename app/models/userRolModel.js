const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { roleModel } = require('./roleModel');
const { userModel } = require('./userModel');

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
        defaultValue: null,
        reference:{
            model: userModel,
            key: 'id'
        }
    },
    role_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
        reference:{
            model: roleModel,
            key: 'id'
        }
    },
},{
    freezeTableName: true,
    sequelize, modelName:'user_rol'
});



module.exports = {
    userRolModel
}