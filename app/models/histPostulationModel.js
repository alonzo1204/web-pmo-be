'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class histPostulationModel extends Model{
    static associate(models) {
        histPostulationModel.belongsTo(models.group,{
            foreignKey: "group_id",
        })
        histPostulationModel.belongsTo(models.project,{
          foreignKey: "project_1_id",
        })
        histPostulationModel.belongsTo(models.project,{
          foreignKey: "project_2_id",
        })
        histPostulationModel.belongsTo(models.project,{
          foreignKey: "project_3_id",
        })
        histPostulationModel.belongsTo(models.project,{
          foreignKey: "project_4_id",
        })
        histPostulationModel.belongsTo(models.project,{
          foreignKey: "project_assigned",
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
    id_postulation_row:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
},{
    freezeTableName: true,
    sequelize, modelName:'history_postulations'
});
  return histPostulationModel;
};