'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class projectProcessStateModel extends Model{
        static associate(models) {
      
        }
    }
    projectProcessStateModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type:DataTypes.STRING(100),
            defaultValue: null,
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'project_process_state'
    });
    return projectProcessStateModel;
}
