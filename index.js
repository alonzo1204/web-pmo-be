var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var localPassport = require('./app/middlewares/passport/local-strategy');
var morgan = require('morgan')
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

//MySql Database Connection
var { mysqlConnection } = require('./app/connections');

//MORGAN
app.use(morgan())

// Parse data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Security
app.use(expressSession({ secret: 'temporal_key' }));
app.use(passport.initialize());
app.use(passport.session());

//CONSTANTS
var { server, endpoints, specs } = require('./app/constants');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

//ROUTES
var { ClientsRoute, AuthRoutes, CareerRoutes, SemesterRoutes, PostulationRoutes, ProjectRoutes, RoleRoutes, UserRoutes, CompanyRoutes, GroupRoutes, portfolioRoutes } = require('./app/routes');
const APP_ROUTE = endpoints.API_NAME + endpoints.API_VERSION;

//MySQL Database Connection
mysqlConnection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Connection successfully established with database ' + mysqlConnection.config.database);
    app.listen(server.PORT, function () {
        console.log('Server Running on port ' + server.PORT);
    })
});

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Swagger API",
            version: "1.0",
            description: "Documentacion de la API de Swagger"
        },
        servers: [
            {
                url: "http://localhost:30/api/v1.0/"
            }
        ],
    },
    swagger: '2.0',
    basePath: '/v1',
    schemes: [
        'http',
        'https'
    ],
    consumes: [
        'application/json'
    ],
    produces: [
        'application/json'
    ],
    apis: [`./app/routes/*.js`]

}

const specs2 = swaggerJSDoc(options);

app.use(APP_ROUTE + endpoints.CLIENTS_URL.MAIN, ClientsRoute);
app.use(APP_ROUTE + endpoints.AUTH_URL.MAIN, AuthRoutes);
app.use(APP_ROUTE + endpoints.CAREER_URL.MAIN, CareerRoutes);
app.use(APP_ROUTE + endpoints.SEMESTER_URL.MAIN, SemesterRoutes);
app.use(APP_ROUTE + endpoints.POSTULATION_URL.MAIN, PostulationRoutes);
app.use(APP_ROUTE + endpoints.PROJECT_URL.MAIN, ProjectRoutes);
app.use(APP_ROUTE + endpoints.ROLE_URL.MAIN, RoleRoutes);
app.use(APP_ROUTE + endpoints.USER_URL.MAIN, UserRoutes);
app.use(APP_ROUTE + endpoints.COMPANY_URL.MAIN, CompanyRoutes);
app.use(APP_ROUTE + endpoints.GROUP_URL.MAIN, GroupRoutes);
app.use(APP_ROUTE + endpoints.PORTFOLIO_URL.MAIN, portfolioRoutes);
app.use(APP_ROUTE + "/api-docs", swaggerUI.serve, swaggerUI.setup(specs2))