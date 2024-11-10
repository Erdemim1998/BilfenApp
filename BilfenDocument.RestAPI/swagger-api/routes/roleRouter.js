const roleController = require('../controllers/roleController.js');
const roleRouter = require('express').Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - Name
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         Id:
 *           type: int
 *           description: The auto-generated id of the role
 *         Name:
 *           type: string
 *           description: The role's name
 *         createdAt:
 *           type: string
 *           description: The role's created date
 *         updatedAt:
 *           type: string
 *           description: The role's updated date
 *       example:
 *         Id: 0
 *         Name: "string"
 *         createdAt: "string"
 *         updatedAt: "string"
 *     CreateUpdateRole:
 *       type: object
 *       required:
 *         - Name
 *       properties:
 *         Id:
 *           type: int
 *           description: The auto-generated id of the role
 *         Name:
 *           type: string
 *           description: The role's name
 *       example:
 *         Id: 0
 *         Name: "string"
 */

/**
 * @swagger
 * /api/roles/GetAllRoles:
 *   get:
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Retrives a list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
roleRouter.get('/GetAllRoles', roleController.GetAllRoles);

/**
 * @swagger
 * /api/roles/GetRole/{id}:
 *   get:
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role Id
 *     responses:
 *       200:
 *         description: Retrives a role by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Role'
 */
roleRouter.get('/GetRole/:id', roleController.GetRole);

/**
 * @swagger
 * /api/roles/CreateRole:
 *   post:
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateRole'
 *     responses:
 *       200:
 *         description: Create a new role data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Role'
 */
roleRouter.post('/CreateRole', roleController.CreateRole);

/**
 * @swagger
 * /api/roles/EditRole:
 *   put:
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateRole'
 *     responses:
 *       200:
 *         description: Edit an existing role data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Role'
 */
roleRouter.put('/EditRole', roleController.EditRole);

/**
 * @swagger
 * /api/roles/DeleteRole/{id}:
 *   delete:
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role Id
 *     responses:
 *       204:
 *         description: Delete an existing role data
 */
roleRouter.delete('/DeleteRole/:id', roleController.DeleteRole);

module.exports = roleRouter