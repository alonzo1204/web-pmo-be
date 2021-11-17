var express = require('express');
var router = express.Router();

//Import Controller
var { RoleController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const ROLE_URL = endpoints.ROLE_URL

//GET FULL LIST
router.get(ROLE_URL.OPERATIONS.LIST, RoleController.getFullList);

module.exports = router;