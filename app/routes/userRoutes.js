var express = require('express');
var router = express.Router();

//Import Controller
var { UserController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const USER_URL = endpoints.USER_URL

//GET FULL LIST
router.get(USER_URL.OPERATIONS.LIST, UserController.getFullList);

module.exports = router;