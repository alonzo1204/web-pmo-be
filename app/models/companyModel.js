'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');


module.exports = (sequelize, DataTypes) => {
    class companyModel extends Model{
        static associate(models) {
      
        }
    }
    
    companyModel.init({
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null
        },
        image:{
            type: DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null
        }
    },{
        freezeTableName: true,
        sequelize, modelName:'company'
    });
    return companyModel;
}


