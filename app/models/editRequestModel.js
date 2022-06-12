'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { projectModel } = require('./projectModel');
const { userModel } = require('./userModel');


module.exports = (sequelize, DataTypes) => {
    class editRequestModel extends Model{
        static associate(models) {
            editRequestModel.belongsTo(models.user,{
                foreignKey: "user_id",
            })
            editRequestModel.belongsTo(models.project,{
                foreignKey: "project_id",
            })
        }
    }
    editRequestModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: userModel,
                key: 'id'
            }
        },
        project_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: projectModel,
                key: 'id'
            }
        },
        attribute_to_change:{
            type:DataTypes.STRING(100),
            allowNull: false,
        },
        value:{
            type:DataTypes.STRING(500),
            allowNull: false,
        },
        accepted:{
            type:DataTypes.INTEGER,
            defaultValue: null
        },
        request_date:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },{
        freezeTableName: true,
        sequelize, modelName:'edit_request'
    });
    return editRequestModel;
}



