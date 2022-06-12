'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { userModel } = require('./userModel');


module.exports = (sequelize, DataTypes) => {
    class hsSessionModel extends Model{
        static associate(models) {
            hsSessionModel.belongsTo(models.user,{
                foreignKey: "user_id",
            })
        }
    }
    hsSessionModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        token:{
            type:DataTypes.STRING(1500),
            allowNull: false,
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: userModel,
                key: 'id'
            }
        },
        created_at:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'hs_session'
    });
    return hsSessionModel;    
}