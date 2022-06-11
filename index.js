var express = require('express');
const path = require('path');
var cors = require('cors');
const _ = require('lodash');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var morgan = require('morgan')
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

//Auth middlewares
require('./app/middlewares/passport/local-strategy');
require('./app/middlewares/passport/jwt-strategy');

//MySql Database Connection
var { mysqlConnection } = require('./app/connections');

//MORGAN
app.use(morgan('tiny'))

// Parse data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Static Files
app.use(express.static(path.join(__dirname, 'app/recursos/archivos')));
app.use(express.static(path.join(__dirname, 'app/recursos/images')));

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
var { ClientsRoute, AuthRoutes, CareerRoutes, SemesterRoutes, PostulationRoutes, ProjectRoutes, RoleRoutes, UserRoutes, CompanyRoutes, GroupRoutes, portfolioRoutes, appSettingsRoutes, registration_permissionsRoutes } = require('./app/routes');
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
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    in: 'header',
                    name: 'Authorization'
                },
            },
        }, security: [{ bearerAuth: [] }],

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

app.use(APP_ROUTE + endpoints.CLIENTS_URL.MAIN, passport.authenticate('jwt', { session: false }), ClientsRoute);
app.use(APP_ROUTE + endpoints.RegistrationPermission_URL.MAIN, passport.authenticate('jwt', { session: false }), registration_permissionsRoutes);
app.use(APP_ROUTE + endpoints.AUTH_URL.MAIN, AuthRoutes);
app.use(APP_ROUTE + endpoints.CAREER_URL.MAIN, passport.authenticate('jwt', { session: false }), CareerRoutes);
app.use(APP_ROUTE + endpoints.SEMESTER_URL.MAIN, passport.authenticate('jwt', { session: false }), SemesterRoutes);
app.use(APP_ROUTE + endpoints.POSTULATION_URL.MAIN, passport.authenticate('jwt', { session: false }), PostulationRoutes);
app.use(APP_ROUTE + endpoints.PROJECT_URL.MAIN, passport.authenticate('jwt', { session: false }), ProjectRoutes);
app.use(APP_ROUTE + endpoints.ROLE_URL.MAIN, passport.authenticate('jwt', { session: false }), RoleRoutes);
app.use(APP_ROUTE + endpoints.USER_URL.MAIN, passport.authenticate('jwt', { session: false }), UserRoutes);
app.use(APP_ROUTE + endpoints.COMPANY_URL.MAIN, passport.authenticate('jwt', { session: false }), CompanyRoutes);
app.use(APP_ROUTE + endpoints.GROUP_URL.MAIN, passport.authenticate('jwt', { session: false }), GroupRoutes);
app.use(APP_ROUTE + endpoints.PORTFOLIO_URL.MAIN, passport.authenticate('jwt', { session: false }), portfolioRoutes);
app.use(APP_ROUTE + endpoints.APP_SETTINGS_URL.MAIN/*, passport.authenticate('jwt', { session: false })*/, appSettingsRoutes);
app.use(APP_ROUTE + "/api-docs", swaggerUI.serve, swaggerUI.setup(specs2));

// ERROR-HANDLING MIDDLEWARE FOR SENDING ERROR RESPONSES TO MAINTAIN A CONSISTENT FORMAT
app.use((err, req, res, next) => {
    console.log('here');
    let responseStatusCode = 401;
    let responseObj = {
        success: false,
        data: [],
        error: err,
        message: 'Usted no se encuentra autorizado para acceder al recurso solicitado.',
    };

    if (!_.isNil(err)) {
        if (err.name === 'JsonWebTokenError') {
            responseStatusCode = 401;
            responseObj.message = 'You cannot get the details. You are not authorized to access this protected resource';
        }
    }

    if (!res.headersSent) {
        res.status(responseStatusCode).json(responseObj);
    }
});
