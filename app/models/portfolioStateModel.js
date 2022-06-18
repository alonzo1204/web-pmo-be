'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class portfolioStateModel extends Model{
        static associate(models) {
      
        }
    }
    
    portfolioStateModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        state:{
            type:DataTypes.STRING(50),
            defaultValue: null,
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'portfolio_state'
    });
    return portfolioStateModel;
}


