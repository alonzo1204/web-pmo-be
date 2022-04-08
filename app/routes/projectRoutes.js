var express = require('express');
var router = express.Router();

var upload = require('../middlewares/upload/uploadExcel');
var uploadArch = require('../middlewares/upload/uploadArch');
global.__basedir = __dirname + "/..";

//Import Controller
var { ProjectController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const PROJECT_URL = endpoints.PROJECT_URL

//GET FULL LIST
router.get(PROJECT_URL.OPERATIONS.LIST, ProjectController.getFullList);

//GET PROJECT BY STATUS
router.get(PROJECT_URL.OPERATIONS.GET_STATUS, ProjectController.getProyectsbyStatus);

//POST DENYING
router.post(PROJECT_URL.OPERATIONS.DENIED, ProjectController.DenegarState);

//POST ACCEPTING
router.post(PROJECT_URL.OPERATIONS.ACCEPT, ProjectController.AprobarState);

//POST ACCEPTING
router.post(PROJECT_URL.OPERATIONS.ACCETEDWCOMS, ProjectController.AprobarcComsState);

//POST UPDATE PROJECT STATE
router.post(PROJECT_URL.OPERATIONS.UPDATE_STATE, ProjectController.actualizarState);

//POST SAVE
router.post(PROJECT_URL.OPERATIONS.SAVE, ProjectController.save);

//Post save Excel
router.post(PROJECT_URL.OPERATIONS.SAVEEXCEL, upload.single("file"), ProjectController.saveExcel);

//Post save Archivo
router.post(PROJECT_URL.OPERATIONS.SAVEARCH, uploadArch.single("file"), ProjectController.saveArch);


module.exports = router;