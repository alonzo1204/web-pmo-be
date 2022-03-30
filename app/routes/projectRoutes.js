var express = require('express');
var router = express.Router();

var upload = require('../middlewares/upload/uploadExcel');
global.__basedir = __dirname + "/..";

//Import Controller
var { ProjectController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const PROJECT_URL = endpoints.PROJECT_URL

//GET FULL LIST
router.get(PROJECT_URL.OPERATIONS.LIST, ProjectController.getFullList);

//POST SAVE
router.post(PROJECT_URL.OPERATIONS.SAVE, ProjectController.save);

//Post save Excel
router.post(PROJECT_URL.OPERATIONS.SAVEEXCEL, upload.single("file"), ProjectController.saveExcel);

module.exports = router;