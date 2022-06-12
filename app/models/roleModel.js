'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');


module.exports = (sequelize, DataTypes) => {
    class roleModel extends Model{
        static associate(models) {
      
        }
    }
    roleModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type:DataTypes.STRING(100),
            allowNull: false,
        },
        access:{
            type:DataTypes.STRING(500),
            defaultValue: null,
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'role'
    });
    return roleModel;
}
