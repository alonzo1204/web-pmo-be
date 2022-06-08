const ClientsController = require('./clientsController');
const AuthController = require('./authController');
const CareerController = require('./careerController');
const SemesterController = require('./semesterController');
const PostulationController = require('./postulationController');
const ProjectController = require('./projectController');
const RoleController = require('./roleController');
const UserController = require('./userController');
const CompanyController = require('./companyController');
const groupController = require('./groupController')
const portfolioController = require('./portfolioController')
const appSettingsController = require('./appSettingsController')
const registration_permissionsController = require('./registrationpermissionsController')

module.exports = {
    ClientsController,
    AuthController,
    CareerController,
    SemesterController,
    PostulationController,
    ProjectController,
    RoleController,
    UserController,
    CompanyController,
    groupController,
    portfolioController,
    appSettingsController,
    registration_permissionsController
}