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

appSettingsModel.associate()
portfolioModel.associate()
projectModel.associate()
postulationModel.associate()
groupModel.associate()

module.exports = {
    projectModel,
    appSettingsModel,
    careerModel,
    companyModel,
    editRequestModel,
    groupModel,
    histPostulationModel,
    histProjectsModel,
    hsAccessModel ,
    hsSessionModel,
    portfolioModel,
    portfolioStateModel,
    postulationModel,
    projectProcessStateModel,
    registrationPermissionsModel,
    roleModel,
    semesterModel,
    userModel,
    userRolModel
}