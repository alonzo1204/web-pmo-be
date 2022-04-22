var express = require('express');
var router = express.Router();
const passport = require('passport');

//Import Auth Controller
var { AuthController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const AUTH_URL = endpoints.AUTH_URL

//LOGIN
router.post(AUTH_URL.OPERATIONS.LOGIN, AuthController.login);

//LOGOUT
router.post(AUTH_URL.OPERATIONS.LOGOUT, AuthController.logout);

//REGISTER
router.post(AUTH_URL.OPERATIONS.REGISTER, AuthController.register);

//SendRequestAccess
router.post(AUTH_URL.OPERATIONS.REQUEST_ACCESS, AuthController.requestAccess);

//CHANGE PASSWORD
router.post(AUTH_URL.OPERATIONS.CHANGEPASSWORD, AuthController.changePassword);

/**
 * @swagger
 * /auth/recover:
 *   get:
 *     summary: Envia un correo con una nueva contraseña al usuario.
 *     tags: [Auth]
 *     parameters:
 *      - in: body
 *        name: Codigo_Usuario
 *        description: codigo de un estudiante
 *        schema:
 *          type: object
 *          required:
 *            - code
 *          properties:
 *            code:
 *              type: string
 *              example: "u201718971"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Codigo_Grupo'
 *     responses:
 *       200:
 *         description: El correo fue enviado correctamente
 *         contents:
 *           application/json:
 *       401:
 *         description: Muestra los posibles errores
 */
router.get(AUTH_URL.OPERATIONS.RECOVER_PASSWORD, AuthController.recoverPass);

module.exports = router;