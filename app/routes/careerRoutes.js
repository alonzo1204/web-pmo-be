var express = require('express');
var router = express.Router();

//Import Controller
var { CareerController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const CAREER_URL = endpoints.CAREER_URL

/**
 * @swagger
 * /careers:
 *   get:
 *     summary: Obtiene una lista de las carreras
 *     tags: [Carrera]
 *     responses:
 *       200:
 *         description: Los datos de las carreras
 *         contens:
 *           application/json:
 */router.get(CAREER_URL.OPERATIONS.LIST, CareerController.getFullList);

module.exports = router;