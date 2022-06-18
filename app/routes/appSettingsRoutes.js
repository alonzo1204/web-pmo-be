var express = require('express');
var router = express.Router();

//Import Controller
var { appSettingsController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const APP_SETTINGS_URL = endpoints.APP_SETTINGS_URL;

//GET SETTINGS BY ID
router.get(APP_SETTINGS_URL.OPERATIONS.GET_ONE, appSettingsController.getConfig);

//EDIT SETTINGS BY ID
router.post(APP_SETTINGS_URL.OPERATIONS.EDIT, appSettingsController.editConfig);

module.exports = router;