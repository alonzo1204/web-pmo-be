var express = require('express');
var router = express.Router();

//Import Controller
var { SemesterController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const SEMESTER_URL = endpoints.SEMESTER_URL

//GET FULL LIST
router.get(SEMESTER_URL.OPERATIONS.LIST, SemesterController.getFullList);

module.exports = router;