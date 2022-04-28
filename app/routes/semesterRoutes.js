var express = require('express');
var router = express.Router();

//Import Controller
var { SemesterController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const SEMESTER_URL = endpoints.SEMESTER_URL

/**
 * @swagger
 * /semester:
 *   get:
 *     summary: Obtiene una lista de los semestres
 *     tags: [Semestre]
 *     responses:
 *       200:
 *         description: Los datos de los semestres
 *         contens:
 *           application/json:
 */router.get(SEMESTER_URL.OPERATIONS.LIST, SemesterController.getFullList);

router.post(SEMESTER_URL.OPERATIONS.SAVE, SemesterController.createSemester);

module.exports = router;