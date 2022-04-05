var express = require('express');
var router = express.Router();

//Import Controller
var { CompanyController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const COMPANY_URL = endpoints.COMPANY_URL

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Obtiene una lista de las compañias
 *     tags: [Compañias]
 *     responses:
 *       200:
 *         description: Los datos de las compañias
 *         contens:
 *           application/json:
 */
router.get(COMPANY_URL.OPERATIONS.LIST, CompanyController.getFullList);

module.exports = router;