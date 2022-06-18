'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class userModel extends Model{
        static associate(models) {
      
        }
    }
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
        sequelize, modelName:'user'
    });
    return userModel;
}
