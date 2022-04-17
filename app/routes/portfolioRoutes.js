var express = require('express');
var router = express.Router();

//Import Controller
var { portfolioController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const PORTFOLIO_URL = endpoints.PORTFOLIO_URL

/**
 * @swagger
 * /portfolios:
 *   get:
 *     summary: Obtener una lista de portfolios y la cantidad total
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Los datos del portfolio
 *         contens:
 *           application/json:
 */
router.get(PORTFOLIO_URL.OPERATIONS.LIST, portfolioController.getFullList);

//POST SAVE PORTFOLIO
router.post(PORTFOLIO_URL.OPERATIONS.SAVE, portfolioController.savePortfolio);

module.exports = router;