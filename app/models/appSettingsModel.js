'use strict';
const { Model } = require('sequelize');
const { portfolioModel } = require('./portfolioModel');


module.exports = (sequelize, DataTypes) => {
    class appSettingsModel extends Model{
        static associate(models) {
            appSettingsModel.belongsTo(models.portfolio, {
                foreignKey: "portfolio_id",
            });
        }
    }
    appSettingsModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        portfolio_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: portfolioModel,
                key: 'id'
            }
        }, 
        front_url:{
            type:DataTypes.STRING(200),
            allowNull: false,
        }, 
        back_url:{
            type:DataTypes.STRING(200),
            allowNull: false,
        }
    },{
        freezeTableName: true,
        sequelize, modelName:'application_settings',
    });
    return appSettingsModel;
}

