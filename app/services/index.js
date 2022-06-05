const ClientsService = require('./clientsService');
const AuthService = require('./authService');
const CareerService = require('./careerService');
const SemesterService = require('./SemesterService');
const PostulationService = require('./postulationService');
const ProjectService = require('./projectService');
const RoleService = require('./roleService');
const UserService = require('./userService');
const CompanyService = require('./companyService');
const groupService = require('./groupService')
const portfolioService = require('./portfolioService')
const AppSettingsService = require('./appSettingsService')
const Registration_permissionsService = require('./registrationpermissionsService')

module.exports = {
    ClientsService,
    AuthService,
    CareerService,
    SemesterService,
    PostulationService,
    ProjectService,
    RoleService,
    UserService,
    CompanyService,
    groupService,
    portfolioService,
    AppSettingsService,
    Registration_permissionsService
}