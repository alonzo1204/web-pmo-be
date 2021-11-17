var express = require('express');
var router = express.Router();

//Import Controller
var { CycleController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const CYCLE_URL = endpoints.CYCLE_URL

//GET FULL LIST
router.get(CYCLE_URL.OPERATIONS.LIST, CycleController.getFullList);

module.exports = router;