const { appSettingsModel } = require('./appSettingsModel');
const { careerModel } = require('./careerModel');
const { companyModel } = require('./companyModel');
const { editRequestModel } = require('./editRequestModel');
const { groupModel } = require('./groupModel');
const { histPostulationModel } = require('./histPostulationModel');
const { histProjectsModel } = require('./histProjectsModel');
const { hsAccessModel } = require('./hsAccessModel');
const { hsSessionModel } = require('./hsSessionModel');
const { portfolioModel } = require('./portfolioModel');
const { portfolioStateModel } = require('./portfolioStateModel');
const { postulationModel } = require('./postulationModel');
const { projectModel } = require('./projectModel');
const { projectProcessStateModel } = require('./projectProcessStateModel');
const { registrationPermissionsModel } = require('./registrationPermissionsModel');
const { roleModel } = require('./roleModel');
const { semesterModel } = require('./semesterModel');
const { userModel } = require('./userModel');
const { userRolModel } = require('./userRolModel');

relations=function(){
    //Relaciones Appsettings
    appSettingsModel.belongsTo(portfolioModel, {
        foreignKey: "portfolio_id",
    });

    //Relaciones editRequest
    editRequestModel.belongsTo(userModel,{
        foreignKey: "user_id",
    })
    editRequestModel.belongsTo(projectModel,{
        foreignKey: "project_id",
    })

    //Relaciones group
    groupModel.belongsTo(projectModel,{
        foreignKey: "project_assigned",
    });
    groupModel.belongsTo(userModel,{as:"student_1",
    foreignKey: "student_1_id",})
    groupModel.belongsTo(userModel,{as:"student_2",
    foreignKey: "student_2_id",})

    //Relaciones histPostulation
    histPostulationModel.belongsTo(groupModel,{
        foreignKey: "group_id",
    })

    //Relaciones histProjects
    histProjectsModel.belongsTo(groupModel,{
        foreignKey: "group_id",
    })
    histProjectsModel.belongsTo(careerModel,{
        foreignKey: "career_id",
    })
    histProjectsModel.belongsTo(userModel,{
        foreignKey: "product_owner_id",
    })

    //Relaciones hsAccess
    hsAccessModel.belongsTo(roleModel,{
        foreignKey: "role_id",
    })

    //Relaciones hsSession
    hsSessionModel.belongsTo(userModel,{
        foreignKey: "user_id",
    })

    //Relaciones portfolio
    portfolioModel.belongsTo(semesterModel,{
        foreignKey: "semester_id",
    })
    portfolioModel.belongsTo(portfolioStateModel,{
        foreignKey: "portfolio_state_id",
    })

    //Relaciones Postulations
    postulationModel.belongsTo(projectModel,{
        as:"project_1",
        foreignKey: "project_1_id",
    })
    postulationModel.belongsTo(groupModel,{
        foreignKey: "group_id",
    })

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

    //Relaciones registrationPermissions
    registrationPermissionsModel.belongsTo(semesterModel,{
        foreignKey: "semester_id",
    })

    //Relaciones userRol
    userRolModel.belongsTo(userModel,{
        foreignKey: "user_id",
    })
    userRolModel.belongsTo(roleModel,{
        foreignKey: "role_id",
    })
}

module.exports={
    relations
}