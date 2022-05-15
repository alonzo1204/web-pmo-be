const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class roleModel extends Model{}

roleModel.init({
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
    access:{
        type:DataTypes.STRING(500),
        defaultValue: null,
    },
},{
    freezeTableName: true,
    sequelize, modelName:'role'
});


module.exports = {
    roleModel
}