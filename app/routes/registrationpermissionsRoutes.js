var express = require('express');
var router = express.Router();

//Import Controller
var { registration_permissionsController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const RP_URL = endpoints.RegistrationPermission_URL



/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Rol]
 *     responses:
 *       200:
 *         description: Los datos de los roles
 *         contens:
 *           application/json:
 */

router.get(RP_URL.OPERATIONS.LIST, registration_permissionsController.getFullList);

module.exports = router;