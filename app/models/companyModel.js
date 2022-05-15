const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class companyModel extends Model{}

companyModel.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null
    },
    image:{
        type: DataTypes.STRING(200),
        allowNull: true,
        defaultValue: null
    }
},{
    freezeTableName: true,
    sequelize, modelName:'company'
});


module.exports = {
    companyModel
}