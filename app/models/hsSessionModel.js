const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { userModel } = require('./userModel');

class hsSessionModel extends Model{}

hsSessionModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    token:{
        type:DataTypes.STRING(1500),
        allowNull: false,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        reference:{
            model: userModel,
            key: 'id'
        }
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},{
    freezeTableName: true,
    sequelize, modelName:'hs_session'
});

//Relaciones
hsSessionModel.belongsTo(userModel,{
    foreignKey: "user_id",
})

module.exports = {
    hsSessionModel
}