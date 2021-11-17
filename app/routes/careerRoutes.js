var express = require('express');
var router = express.Router();

//Import Controller
var { CareerController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const CAREER_URL = endpoints.CAREER_URL

//GET FULL LIST
router.get(CAREER_URL.OPERATIONS.LIST, CareerController.getFullList);

module.exports = router;