'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class histProjectsModel extends Model{
        static associate(models) {
            histProjectsModel.belongsTo(models.group,{
                foreignKey: "group_id",
            })
            histProjectsModel.belongsTo(models.career,{
                foreignKey: "career_id",
            })
            histProjectsModel.belongsTo(models.user,{
                foreignKey: "product_owner_id",
            })
            histProjectsModel.belongsTo(models.user,{
                foreignKey: "portfolio_manager_id",
            })
            histProjectsModel.belongsTo(models.user,{
                foreignKey: "co_autor_id",
            })
            histProjectsModel.belongsTo(models.project_process_state,{
                foreignKey: "project_process_state_id",
            })
            histProjectsModel.belongsTo(models.company,{
                foreignKey: "company_id",
            })
            histProjectsModel.belongsTo(models.portfolio,{
                foreignKey: "portfolio_id",
            })
            histProjectsModel.belongsTo(models.semester,{
                foreignKey: "semester_id",
            })
        }
    }
    histProjectsModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        code:{
            type:DataTypes.STRING(45),
            allowNull: false,
        },
        name:{
            type:DataTypes.STRING(150),
            allowNull: false,
        },
        description:{
            type:DataTypes.STRING(250),
            defaultValue: null
        },
        general_objective:{
            type:DataTypes.STRING(250),
            defaultValue: 'GENERAL OBJECTIVE VALUE'
        },
        specific_objetive_1:{
            type:DataTypes.STRING(250),
            defaultValue: 'SPECIFIC OBJECTIVE 1 VALUE'
        },
        specific_objetive_2:{
            type:DataTypes.STRING(250),
            defaultValue: 'SPECIFIC OBJECTIVE 2 VALUE'
        },
        specific_objetive_3:{
            type:DataTypes.STRING(250),
            defaultValue: 'SPECIFIC OBJECTIVE 3 VALUE'
        },
        specific_objetive_4:{
            type:DataTypes.STRING(250),
            defaultValue: 'SPECIFIC OBJECTIVE 4 VALUE'
        },
        postulation_date:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        paper:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        devices:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        url_file:{
            type:DataTypes.STRING(250),
            defaultValue: null,
        },
        url_sharepoint:{
            type:DataTypes.STRING(250),
            defaultValue: null,
        },
        career_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: "career",
                key: 'id'
            }
        },
        product_owner_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: "user",
                key: 'id'
            }
        },
        portfolio_manager_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: "user",
                key: 'id'
            }
        },
        co_autor_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: "user",
                key: 'id'
            }
        },
        project_process_state_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: "project_process_state",
                key: 'id'
            }
        },
        company_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: "company",
                key: 'id'
            }
        },
        group_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: "group",
                key: 'id'
            }
        },
        portfolio_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: "portfolio",
                key: 'id'
            }
        },
        semester_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: "semester",
                key: 'id'
            }
        },
        comments:{
            type:DataTypes.STRING(350),
            defaultValue: null,
        },
        update_date:{
            type:DataTypes.DATE,
            defaultValue: null,
        },
        id_project_row:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        freezeTableName: true,
        sequelize, modelName:'history_projects'
    });
    return histProjectsModel;
}
