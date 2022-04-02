var express = require('express');
var router = express.Router();

//Import Controller
var { groupController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const GROUP_URL = endpoints.GROUP_URL

//POST SAVE
router.post(GROUP_URL.OPERATIONS.SAVE, groupController.save);

module.exports = router;