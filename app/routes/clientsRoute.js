var express = require('express');
var router = express.Router();

//Import Clients Controller
var { ClientsController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const CLIENTS_URL = endpoints.CLIENTS_URL

//GET CLIENTS LIST
router.get(CLIENTS_URL.OPERATIONS.LIST, ClientsController.getClients);

//GET CLIENTS BY ID
router.get(CLIENTS_URL.OPERATIONS.GET_ONE, ClientsController.getClientsById);

//SAVE CLIENT
router.post(CLIENTS_URL.OPERATIONS.SAVE, ClientsController.saveClient);

module.exports = router;