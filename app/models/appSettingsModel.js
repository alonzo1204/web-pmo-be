const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { portfolioModel } = require('./portfolioModel');

class appSettingsModel extends Model{}
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



module.exports = {
    appSettingsModel
}