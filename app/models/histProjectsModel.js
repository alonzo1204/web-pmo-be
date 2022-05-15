const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { careerModel } = require('./careerModel');
const { companyModel } = require('./companyModel');
const { groupModel } = require('./groupModel');
const { portfolioModel } = require('./portfolioModel');
const { projectProcessStateModel } = require('./projectProcessStateModel');
const { semesterModel } = require('./semesterModel');
const { userModel } = require('./userModel');

class histProjectsModel extends Model{}

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

//Relaciones
histProjectsModel.belongsTo(groupModel,{
    foreignKey: "group_id",
})
histProjectsModel.belongsTo(careerModel,{
    foreignKey: "career_id",
})
histProjectsModel.belongsTo(userModel,{
    foreignKey: "product_owner_id",
})


module.exports = {
    histProjectsModel
}