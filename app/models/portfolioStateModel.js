const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class portfolioStateModel extends Model{}

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
    sequelize, modelName:"portfolio_state"
});


module.exports = {
    portfolioStateModel
}