var express = require('express');
var router = express.Router();

var upload = require('../middlewares/upload/uploadExcel');
global.__basedir = __dirname + "/..";

//Import Controller
var { ProjectController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');

const PROJECT_URL = endpoints.PROJECT_URL
/**
 * @swagger
 * components:
 *     Projecto:
 *       example:
 *         code: "PRY-00000"
 *         name: "SI_PRUEBAS"
 *         description: "Sistema de pruebas de proyecto"
 *         general_objective: "Hacer pruebaas"
 *         paper: 1
 *         devices: 1
 *         career_id: 3
 *         project_process_state_id: 1
 *         company: 1
 *         group_id: 1
 */


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
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Obtiene una lista de los projectos
 *     tags: [Projectos]
 *     responses:
 *       200:
 *         description: Los datos de los projectos
 *         contens:
 *           application/json:
 */
router.get(PROJECT_URL.OPERATIONS.LIST, ProjectController.getFullList);
/**
 * @swagger
 * path:
 * /projects/save:
 *   post:
 *     summary: Crea un nuevo projecto
 *     tags: [Projectos]
 *     parameters:
 *      - in: body
 *        name: projecto
 *        description: parametros del projecto
 *        schema:
 *          type: object
 *          required:
 *            - code  
 *            - name
 *            - description
 *            - general_objective
 *            - paper
 *            - devices
 *            - career_id
 *            - project_process_state_id
 *            - company
 *            - group_id
 *          properties:
 *            code:
 *              type: string
 *              example: "PRY-00000"
 *            name:
 *              type: string
 *              example: "SI_PRUEBAS"
 *            description:
 *              type: string
 *              example: "Sistema de pruebas de proyecto"
 *            general_objective:
 *              type: string
 *              example: "Hacer pruebaas"
 *            paper:
 *              type: integer
 *              example: 1
 *            devices:
 *              type: integer
 *              example: 1
 *            career_id:
 *              type: integer
 *              example: 3
 *            project_process_state_id:
 *              type: integer
 *              example: 1
 *            company:
 *              type: integer
 *              example: 1
 *            group_id:
 *              type: integer
 *              example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Projecto'
 *     responses:
 *       200:
 *         description: group created successfully
 *         contents:
 *           application/json:
 *       401:
 *         description: Muestra los posibles errores
 */
router.post(PROJECT_URL.OPERATIONS.SAVE, ProjectController.save);

router.post(PROJECT_URL.OPERATIONS.SAVEEXCEL, upload.single("file"), ProjectController.saveExcel);

module.exports = router;