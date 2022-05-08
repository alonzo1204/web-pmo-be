const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

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
    },
    portfolio_state_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
    },
},{
    freezeTableName: true,
    sequelize, modelName:"portfolio"
});


module.exports = {
    portfolioModel
}