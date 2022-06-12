'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { careerModel } = require('./careerModel');
const { companyModel } = require('./companyModel');
const { semesterModel } = require('./semesterModel');
const { portfolioModel } = require('./portfolioModel');
const { projectProcessStateModel } = require('./projectProcessStateModel');
const { userModel } = require('./userModel');
//const { groupModel } = require('./groupModel');
//const { postulationModel } = require('./postulationModel');


module.exports = (sequelize, DataTypes) => {
    class projectModel extends Model{
        static associate(models) {
            projectModel.belongsTo(models.career,{
                foreignKey: "career_id",
            })
            projectModel.belongsTo(models.project_process_state,{
                foreignKey: "project_process_state_id",
            })
            projectModel.belongsTo(models.company,{
                foreignKey: "company_id",
            })
            projectModel.belongsTo(models.portfolio,{
                foreignKey: "portfolio_id",
            })
            projectModel.belongsTo(models.semester,{
                foreignKey: "semester_id",
            })
            projectModel.belongsTo(models.user,{
                as:"portfolio_manager",
                foreignKey: "portfolio_manager_id",
            })
            projectModel.belongsTo(models.user,{
                as:"product_owner",
                foreignKey: "product_owner_id",
            })
            projectModel.belongsTo(models.user,{
                as:"co_autor",
                foreignKey: "co_autor_id",
            })
            projectModel.belongsTo(models.group,{
                foreignKey: "group_id",
            })
        }
    }
    projectModel.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        code:{
            type:DataTypes.STRING(45),
            allowNull: false,
            unique: true,
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
                model: careerModel,
                key: 'id'
            }
        },
        product_owner_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: userModel,
                key: 'id'
            }
        },
        portfolio_manager_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: userModel,
                key: 'id'
            }
        },
        co_autor_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: userModel,
                key: 'id'
            }
        },
        project_process_state_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: projectProcessStateModel,
                key: 'id'
            }
        },
        company_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: companyModel,
                key: 'id'
            }
        },/*
        group_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: groupModel,
                key: 'id'
            }
        },*/
        portfolio_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: portfolioModel,
                key: 'id'
            }
        },
        semester_id:{
            type:DataTypes.INTEGER,
            defaultValue: null,
            reference:{
                model: semesterModel,
                key: 'id'
            }
        },
        comments:{
            type:DataTypes.STRING(350),
            defaultValue: null,
        },
        update_date:{
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },{
        freezeTableName: true,
        sequelize, modelName:'project'
    });
    return projectModel;
}
