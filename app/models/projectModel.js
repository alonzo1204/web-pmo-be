const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { careerModel } = require('./careerModel');
const { companyModel } = require('./companyModel');
const { groupModel } = require('./groupModel');
const { portfolioModel } = require('./portfolioModel');
const { postulationModel } = require('./postulationModel');
const { projectProcessStateModel } = require('./projectProcessStateModel');
const { semesterModel } = require('./semesterModel');
const { userModel } = require('./userModel');

class projectModel extends Model{}

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
    },
    group_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
        reference:{
            model: groupModel,
            key: 'id'
        }
    },
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

projectModel.associate=function () {
    //Relaciones project
    projectModel.belongsTo(careerModel,{
        foreignKey: "career_id",
    })
    projectModel.belongsTo(projectProcessStateModel,{
        foreignKey: "project_process_state_id",
    })
    projectModel.belongsTo(companyModel,{
        foreignKey: "company_id",
    })
    projectModel.belongsTo(portfolioModel,{
        foreignKey: "portfolio_id",
    })
    projectModel.belongsTo(semesterModel,{
        foreignKey: "semester_id",
    })
    projectModel.belongsTo(userModel,{
        as:"portfolio_manager",
        foreignKey: "portfolio_manager_id",
    })
    projectModel.belongsTo(userModel,{
        as:"product_owner",
        foreignKey: "product_owner_id",
    })
    projectModel.belongsTo(userModel,{
        as:"co_autor",
        foreignKey: "co_autor_id",
    })
    
    projectModel.belongsTo(groupModel,{
        foreignKey: "group_id",
    })
    
    //projectModel.hasOne(groupModel,{foreignKey: "group_id",})
    
};

module.exports = {
    projectModel
}