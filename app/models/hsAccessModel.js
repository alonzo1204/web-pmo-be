const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class hsAccessModel extends Model{}

hsAccessModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    role_id:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    token:{
        type:DataTypes.STRING(150),
        allowNull: false,
    },
},{
    freezeTableName: true,
    sequelize, modelName:"hs_access"
});


module.exports = {
    hsAccessModel
}