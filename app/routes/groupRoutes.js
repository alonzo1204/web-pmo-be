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
 * components:
 *     Codigo_Grupo:
 *       example:
 *         code: "u201718971"
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
 *        description: ids de los estudiantes
 *        schema:
 *          type: object
 *          required:
 *            - student
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



/**
 * @swagger
 * /group/mygroup:
 *   post:
 *     summary: Obtiene una lista de las carreras
 *     tags: [Grupos]
 *     parameters:
 *      - in: body
 *        name: group
 *        description: codigos de un estudiante
 *        schema:
 *          type: object
 *          required:
 *            - code
 *          properties:
 *            code:
 *              type: string
 *              example: "u201718971"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Codigo_Grupo'
 *     responses:
 *       200:
 *         description: muestra el detalle de los grupos
 *         contents:
 *           application/json:
 *       401:
 *         description: Muestra los posibles errores
 */
router.get(GROUP_URL.OPERATIONS.GET_GROUP, groupController.getgroup);

router.get(GROUP_URL.OPERATIONS.LIST, groupController.listAll);

module.exports = router;