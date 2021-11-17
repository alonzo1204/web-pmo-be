var express = require('express');
var router = express.Router();

//Import Controller
var { ProjectController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const PROJECT_URL = endpoints.PROJECT_URL

//GET FULL LIST
router.get(PROJECT_URL.OPERATIONS.LIST, ProjectController.getFullList);

module.exports = router;