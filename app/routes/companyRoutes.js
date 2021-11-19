var express = require('express');
var router = express.Router();

//Import Controller
var { CompanyController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const COMPANY_URL = endpoints.COMPANY_URL

//GET FULL LIST
router.get(COMPANY_URL.OPERATIONS.LIST, CompanyController.getFullList);

module.exports = router;