var ClientsRoute = require('./clientsRoute');
var AuthRoutes = require('./authRoutes');
var CareerRoutes = require('./CareerRoutes');
var SemesterRoutes = require('./SemesterRoutes');
var PostulationRoutes = require('./PostulationRoutes');
var ProjectRoutes = require('./ProjectRoutes');
var RoleRoutes = require('./RoleRoutes');
var UserRoutes = require('./UserRoutes');
var CompanyRoutes = require('./CompanyRoutes');
var GroupRoutes = require('./groupRoutes')
var portfolioRoutes = require('./portfolioRoutes')
var appSettingsRoutes = require('./appSettingsRoutes')
var registration_permissionsRoutes = require('./registration_permissionsRoutes')

module.exports = {
    ClientsRoute,
    AuthRoutes,
    CareerRoutes,
    SemesterRoutes,
    PostulationRoutes,
    ProjectRoutes,
    RoleRoutes,
    UserRoutes,
    CompanyRoutes,
    GroupRoutes,
    portfolioRoutes,
    appSettingsRoutes,
    registration_permissionsRoutes
}