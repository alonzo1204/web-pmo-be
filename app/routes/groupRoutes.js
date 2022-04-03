var express = require('express');
var router = express.Router();


//Import Controller
var { groupController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const GROUP_URL = endpoints.GROUP_URL
/**
 * @swagger
 * components:
 *     Grupo:
 *       example:
 *         student_1_id: 31
 *         student_2_id: 32
 */

/**
 * @swagger
 * path:
 * /group/save:
 *   post:
 *     summary: Crea un nuevo grupo
 *     tags: [Grupos]
 *     parameters:
 *      - in: body
 *        name: group
 *        description: codigos de los estudiantes
 *        schema:
 *          type: object
 *          required:
 *            - student_1_id
 *            - student_2_id
 *          properties:
 *            student_1_id:
 *              type: integer
 *              example: 31
 *            student_2_id:
 *              type: integer
*              example: 32
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Grupo'
 *     responses:
 *       200:
 *         description: group created successfully
 *         contents:
 *           application/json:
 *       401:
 *         description: Muestra los posibles errores
 */
router.post(GROUP_URL.OPERATIONS.SAVE, groupController.save);

module.exports = router;