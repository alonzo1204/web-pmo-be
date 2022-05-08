const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class registrationPermissionsModel extends Model{}

registrationPermissionsModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    code:{
        type:DataTypes.STRING(25),
        defaultValue: null,
        unique: true,
    },
    enabled:{
        type:DataTypes.INTEGER,
        defaultValue: null,
    },
    semester_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    }
},{
    freezeTableName: true,
    sequelize, modelName:"registration_permissions"
});


module.exports = {
    registrationPermissionsModel
}