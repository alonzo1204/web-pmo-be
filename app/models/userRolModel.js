'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class userRolModel extends Model{
        static associate(models) {
            userRolModel.belongsTo(models.user,{
                foreignKey: "user_id",
            })
            userRolModel.belongsTo(models.role,{
                foreignKey: "role_id",
            })
        }
    }
    userRolModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: "user",
                key: 'id'
            }
        },
        role_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: "role",
                key: 'id'
            }
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'user_rol'
    });
    return userRolModel;
}

