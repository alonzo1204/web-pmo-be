const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class semesterModel extends Model{}

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


module.exports = {
    semesterModel
}