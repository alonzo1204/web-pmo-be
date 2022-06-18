'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupModel extends Model{
    static associate(models) {
        groupModel.belongsTo(models.project,{
            foreignKey: "project_assigned",
        });
        groupModel.belongsTo(models.user,{as:"student_1",
        foreignKey: "student_1_id",})
        groupModel.belongsTo(models.user,{as:"student_2",
        foreignKey: "student_2_id",})
    }
}
groupModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    group_weighted_average:{
        type:DataTypes.DECIMAL(10, 2),
        defaultValue: null
    },
    student_1_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
        reference:{
            model: "user",
            key: 'id'
        }
    },
    student_2_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
        reference:{
            model: "user",
            key: 'id'
        }
    },
    project_assigned:{
        type:DataTypes.INTEGER,
        defaultValue: null,
        reference:{
            model: "project",
            key: 'id'
        }
    },
},{
    freezeTableName: true,
    sequelize, modelName:'group'
});
  return groupModel;
};