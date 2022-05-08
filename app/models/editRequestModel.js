const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class editRequestModel extends Model{}

editRequestModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    project_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    attribute_to_change:{
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    value:{
        type:DataTypes.STRING(500),
        allowNull: false,
    },
    accepted:{
        type:DataTypes.INTEGER,
        defaultValue: null
    },
    request_date:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    freezeTableName: true,
    sequelize, modelName:"edit_request"
});


module.exports = {
    editRequestModel
}