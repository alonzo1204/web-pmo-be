var express = require('express');
var router = express.Router();

//Import Controller
var { UserController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const USER_URL = endpoints.USER_URL

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Los datos de los usuarios
 *         contens:
 *           application/json:
 */
router.get(USER_URL.OPERATIONS.LIST, UserController.getFullList);

module.exports = router;