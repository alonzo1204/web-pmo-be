var express = require('express');
var router = express.Router();

//Import Controller
var { PostulationController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const POSTULATION_URL = endpoints.POSTULATION_URL

//GET FULL LIST
router.get(POSTULATION_URL.OPERATIONS.LIST, PostulationController.getFullList);

//POST SAVE
router.post(POSTULATION_URL.OPERATIONS.SAVE, PostulationController.save);

module.exports = router;