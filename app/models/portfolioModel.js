const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { portfolioStateModel } = require('./portfolioStateModel');
const { semesterModel } = require('./semesterModel');

class portfolioModel extends Model{}

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

portfolioModel.associate=function(){
    //Relaciones
    portfolioModel.belongsTo(semesterModel,{
        foreignKey: "semester_id",
    })
    portfolioModel.belongsTo(portfolioStateModel,{
        foreignKey: "portfolio_state_id",
    })
}

module.exports = {
    portfolioModel
}