var express = require('express');
var router = express.Router();

var upload = require('../middlewares/upload/uploadExcel');

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

//POST DAR DE BAJA
router.post(USER_URL.OPERATIONS.DOWN, UserController.darBaja);

//POST CARGA MASIVA DE REGISTRO
router.post(USER_URL.OPERATIONS.MASIVEREGISTER, upload.single("file"), UserController.RegistroMasivo);

//POST CARGA MASIVA DE REGISTRO DE LOS BLOQUEADOS
router.post(USER_URL.OPERATIONS.MREGISTERBLOCK, upload.single("file"), UserController.RegistroMasivoBloqueados);

router.post(USER_URL.OPERATIONS.UPDATE, UserController.changeName);

//GET LISTA DE PROFESORES Y MIEMBROS DE COMITE
router.get(USER_URL.OPERATIONS.GET_TEACHERS, UserController.getFullListTeachers);

module.exports = router;