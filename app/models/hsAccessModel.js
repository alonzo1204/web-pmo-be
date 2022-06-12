'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { roleModel } = require('./roleModel');


module.exports = (sequelize, DataTypes) => {
    class hsAccessModel extends Model{
        static associate(models) {
            hsAccessModel.belongsTo(models.role,{
                foreignKey: "role_id",
            })
        }
    }
    
    hsAccessModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        role_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: roleModel,
                key: 'id'
            }
        },
        token:{
            type:DataTypes.STRING(150),
            allowNull: false,
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'hs_access'
    });
    return hsAccessModel;
}
