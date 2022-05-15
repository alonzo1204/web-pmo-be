const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class careerModel extends Model{}

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


module.exports = {
    careerModel
}