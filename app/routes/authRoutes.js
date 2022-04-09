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

//REGISTER
router.post(AUTH_URL.OPERATIONS.REGISTER, AuthController.register);

router.get(AUTH_URL.OPERATIONS.RECOVER_PASSWORD, AuthController.recoverPass);

module.exports = router;