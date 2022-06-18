'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class semesterModel extends Model{
        static associate(models) {
      
        }
    }
    semesterModel.init({
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
        date_from:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        date_until:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'semester'
    });
    return semesterModel;
}
