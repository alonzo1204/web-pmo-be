'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { portfolioStateModel } = require('./portfolioStateModel');
const { semesterModel } = require('./semesterModel');


module.exports = (sequelize, DataTypes) => {
    class portfolioModel extends Model{
        static associate(models) {
            portfolioModel.belongsTo(models.semester,{
                foreignKey: "semester_id",
            })
            portfolioModel.belongsTo(models.portfolio_state,{
                foreignKey: "portfolio_state_id",
            })
        }
    }
    portfolioModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type:DataTypes.STRING(50),
            defaultValue: null,
        },
        semester_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: semesterModel,
                key: 'id'
            }
        },
        portfolio_state_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: portfolioStateModel,
                key: 'id'
            }
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'portfolio'
    });
    return portfolioModel;
}
