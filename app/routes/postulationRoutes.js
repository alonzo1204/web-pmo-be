var express = require('express');
var router = express.Router();

//Import Controller
var { PostulationController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const POSTULATION_URL = endpoints.POSTULATION_URL
/**
 * @swagger
 * components:
 *     Postulaciones:
 *       example:
 *         project_1_id: 1
 *         project_2_id: 2
 *         project_3_id: 3
 *         project_4_id: 4
 *         group_id: 8
 */


/**
 * @swagger
 * /postulations:
 *   get:
 *     summary: Obtiene una lista de los projectos
 *     tags: [Postulaciones]
 *     responses:
 *       200:
 *         description: Los datos de los projectos
 *         contens:
 *           application/json:
 */
router.get(POSTULATION_URL.OPERATIONS.LIST, PostulationController.getFullList);

router.get(POSTULATION_URL.OPERATIONS.GET_POSTULATIONS, PostulationController.getpostulations);

/**
 * @swagger
 * path:
 * /postulations/save:
 *   post:
 *     summary: Crea una nueva postulacion
 *     tags: [Postulaciones]
 *     parameters:
 *      - in: body
 *        name: Postulacion
 *        description: parametros de la Postulaciones
 *        schema:
 *          type: object
 *          required:
 *            - code  
 *            - name
 *            - description
 *            - general_objective
 *            - group_id
 *          properties:
 *            project_1_id:
 *              type: integer
 *              example: 1
 *            project_2_id:
 *              type: integer
 *              example: 2
 *            project_3_id:
 *              type: integer
 *              example: 3
 *            project_4_id:
 *              type: integer
 *              example: 4
 *            group_id:
 *              type: integer
 *              example: 8
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Postulaciones'
 *     responses:
 *       200:
 *         description: group created successfully
 *         contents:
 *           application/json:
 *       401:
 *         description: Muestra los posibles errores
 */
router.post(POSTULATION_URL.OPERATIONS.SAVE, PostulationController.save);

module.exports = router;