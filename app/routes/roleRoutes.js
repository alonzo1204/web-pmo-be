var express = require('express');
var router = express.Router();

//Import Controller
var { RoleController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const ROLE_URL = endpoints.ROLE_URL



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

router.get(ROLE_URL.OPERATIONS.LIST, RoleController.getFullList);

module.exports = router;