var express = require('express');
var router = express.Router();

//Import Controller
var { ProjectController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const PROJECT_URL = endpoints.PROJECT_URL

//GET FULL LIST
router.get(PROJECT_URL.OPERATIONS.LIST, ProjectController.getFullList);

//POST SAVE
router.post(PROJECT_URL.OPERATIONS.SAVE, ProjectController.save);

module.exports = router;