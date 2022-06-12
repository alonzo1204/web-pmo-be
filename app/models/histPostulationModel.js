'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { groupModel } = require('./groupModel');
const { projectModel } = require('./projectModel');


module.exports = (sequelize, DataTypes) => {
    class histPostulationModel extends Model{
        static associate(models) {
            histPostulationModel.belongsTo(models.group,{
                foreignKey: "group_id",
            })
        }
    }
    histPostulationModel.init({
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
                model: projectModel,
                key: 'id'
            }
        },
        project_2_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: projectModel,
                key: 'id'
            }
        },
        project_3_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: projectModel,
                key: 'id'
            }
        },
        project_4_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: projectModel,
                key: 'id'
            }
        },
        iteration:{
            type:DataTypes.INTEGER,
            defaultValue: 1
        },
        postulation_date:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        group_weighted_average:{
            type:DataTypes.DECIMAL(10, 2),
            defaultValue: null
        },
        project_assigned:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: projectModel,
                key: 'id'
            }
        },
        group_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: groupModel,
                key: 'id'
            }
        },
        update_date:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        id_postulation_row:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'history_postulations'
    });
    return histPostulationModel;
}
