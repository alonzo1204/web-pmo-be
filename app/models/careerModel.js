'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');


module.exports = (sequelize, DataTypes) => {
    class careerModel extends Model{
        static associate(models) {
      
        }
    }

    careerModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type:DataTypes.STRING(200),
            allowNull: false,
        }
    },{
        freezeTableName: true,
        sequelize, modelName:'career'
    });
    return careerModel;   

}
