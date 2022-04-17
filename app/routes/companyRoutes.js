var express = require('express');
var router = express.Router();

var uploadImage = require('../middlewares/upload/uploadImage');
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

//SAVE COMPANY
router.post(COMPANY_URL.OPERATIONS.SAVE, uploadImage.single("image"),  CompanyController.saveCompany)

module.exports = router;