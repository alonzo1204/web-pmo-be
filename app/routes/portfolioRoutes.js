var express = require('express');
var router = express.Router();

//Import Controller
var { portfolioController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const PORTFOLIO_URL = endpoints.PORTFOLIO_URL

router.get(PORTFOLIO_URL.OPERATIONS.LIST, portfolioController.getFullList);

module.exports = router;