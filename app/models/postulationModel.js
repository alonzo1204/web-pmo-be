'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class postulationModel extends Model{
        static associate(models) {
            postulationModel.belongsTo(models.project,{
                as:"project_1",
                foreignKey: "project_1_id",
            })
            postulationModel.belongsTo(models.project,{
                as:"project_2",
                foreignKey: "project_2_id",
            })
            postulationModel.belongsTo(models.project,{
                as:"project_3",
                foreignKey: "project_3_id",
            })
            postulationModel.belongsTo(models.project,{
                as:"project_4",
                foreignKey: "project_4_id",
            })
            postulationModel.belongsTo(models.project,{
                as:"project_assigned",
                foreignKey: "project_assigned",
            })
            postulationModel.belongsTo(models.group,{
                foreignKey: "group_id",
            })
        }
    }
    postulationModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        accepted:{
            type:DataTypes.INTEGER,
            defaultValue: null
        },
        project_1_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: "project",
                key: 'id'
            }
        },
        project_2_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: "project",
                key: 'id'
            }
        },
        project_3_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: "project",
                key: 'id'
            }
        },
        project_4_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: "project",
                key: 'id'
            }
        },
        iteration:{
            type:DataTypes.INTEGER,
            defaultValue: 1
        },
        postulation_date:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        group_weighted_average:{
            type:DataTypes.DECIMAL(10, 2),
            defaultValue: null
        },
        project_assigned:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: "project",
                key: 'id'
            }
        },
        group_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: "group",
                key: 'id'
            }
        },
        update_date:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'postulation'
    });
    return postulationModel;
}
