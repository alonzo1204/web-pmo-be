'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class registrationPermissionsModel extends Model{
        static associate(models) {
            registrationPermissionsModel.belongsTo(models.semester,{
                foreignKey: "semester_id",
            })
        
        }
    }
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
            reference:{
                model: "semester",
                key: 'id'
            }
        }
    },{
        freezeTableName: true,
        sequelize, modelName:'registration_permissions'
    });
    return registrationPermissionsModel;
}
