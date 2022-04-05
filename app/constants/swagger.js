const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
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
                url: "http://localhost:30/"
            }
        ],
    },
    apis: ["./app/routes/groupRoutes.js"]
}

const specs = swaggerJSDoc(options);

module.exports = {
    specs
}