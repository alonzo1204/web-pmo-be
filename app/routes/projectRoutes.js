var express = require('express');
var router = express.Router();

var upload = require('../middlewares/upload/uploadExcel');
var uploadArch = require('../middlewares/upload/uploadArch');
global.__basedir = __dirname + "/..";

//Import Controller
var { ProjectController } = require('../controllers');

//Import Endpoints Contants
var { endpoints } = require('../constants');
const { route } = require('./clientsRoute');

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

/**
 * @swagger
 * components:
 *     ProjectoUpdate:
 *       example:
 *         code: ["PRY20212001","PRY20212002","PRY20212003"]
 *         name: "general_objective"
 *         description: "Cambio de projecto"
 */
router.get(PROJECT_URL.OPERATIONS.GET_STATUS, ProjectController.getProyectsbyStatus); //Revisar

router.post(PROJECT_URL.OPERATIONS.MULTIPLE_UPDATE, ProjectController.mutipleUpdates);

router.post(PROJECT_URL.OPERATIONS.REQUEST_UPDATE, ProjectController.sendUpdateRequest);

router.post(PROJECT_URL.OPERATIONS.HANDLE_UPDATE, ProjectController.handleUpdate);

//POST DENYING
router.post(PROJECT_URL.OPERATIONS.DENIED, ProjectController.DenegarState);//Revisar

//POST ACCEPTING
router.post(PROJECT_URL.OPERATIONS.ACCEPT, ProjectController.AprobarState);//Revisar

//POST ACCEPTING
router.post(PROJECT_URL.OPERATIONS.ACCETED_COMMENTS, ProjectController.AprobarcComsState);//Revisar

router.post(PROJECT_URL.OPERATIONS.UPDATE_STATE, ProjectController.actualizarState); //Revisar

//POST SAVE
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Obtiene una lista de los projectos
 *     tags: [Projectos]
 *     parameters:
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

router.post(PROJECT_URL.OPERATIONS.SAVE_EXCEL, upload.single("file"), ProjectController.saveExcel);

/**
 * @swagger
 * path:
 * /projects/update:
 *   post:
 *     summary: Actualiza de forma masiva projectos a partir de su codigo
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
 *          properties:
 *            code:
 *              type: array
 *              example: ["PRY20212001","PRY20212002","PRY20212003"]
 *            column:
 *              type: string
 *              example: "general_objective"
 *            value:
 *              type: string
 *              example: "Cambio de projecto"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/ProjectoUpdate'
 *     responses:
 *       200:
 *         description: group created successfully
 *         contents:
 *           application/json:
 *       401:
 *         description: Muestra los posibles errores
 */
router.post(PROJECT_URL.OPERATIONS.UPDATE, ProjectController.updateProject);


//Post save Archivo
router.post(PROJECT_URL.OPERATIONS.SAVE_ARCH, uploadArch.single("file"), ProjectController.saveArch);

//GET VARIOUS STATUS
router.get(PROJECT_URL.OPERATIONS.GET_VARIOUS_STATUS, ProjectController.getProyectsbyStatusVarious);

//GET MY EDIT REQUEST
router.get(PROJECT_URL.OPERATIONS.GET_MY_REQUEST_EDITS, ProjectController.getMyEditRequest);

//GET EDITS REQUESTS
router.get(PROJECT_URL.OPERATIONS.GET_ALL_REQUEST_EDITS, ProjectController.getEditsRequest);

//SAVE NEW PROJECT WITH ARCHIVE
router.post(PROJECT_URL.OPERATIONS.SAVE_NEW_WITH_ARCHIVE, uploadArch.single("file"), ProjectController.saveWithArchive);

router.get(PROJECT_URL.OPERATIONS.DOWNLOAD_PROJECTS, ProjectController.downloadExcel)

module.exports = router;