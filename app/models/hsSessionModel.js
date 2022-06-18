'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class hsSessionModel extends Model{
        static associate(models) {
            hsSessionModel.belongsTo(models.user,{
                foreignKey: "user_id",
            })
        }
    }
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
                model: "user",
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
    return hsSessionModel;    
}