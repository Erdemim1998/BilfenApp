const documentController = require('../controllers/documentController.js');
const documentRouter = require('express').Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       required:
 *         - Name
 *         - FilePath
 *         - Status
 *         - CreatedAt
 *         - UpdatedAt
 *       properties:
 *         Id:
 *           type: int
 *           description: The auto-generated id of the document
 *         Name:
 *           type: string
 *           description: The document's name
 *         FilePath:
 *           type: string
 *           description: The document's file path
 *         Status:
 *           type: string
 *           description: The document's status
 *         CreatedAt:
 *           type: string
 *           description: The document's created date
 *         UpdatedAt:
 *           type: string
 *           description: The document's updated date
 *         UserId:
 *           type: int
 *           description: The document's user id
 *         User:
 *           type: object
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *       example:
 *         Id: 0
 *         Name: "string"
 *         FilePath: "string"
 *         Status: "string"
 *         CreatedAt: "string"
 *         UpdatedAt: "string"
 *         UserId: 0
 *         User:
 *          Id: 0
 *          FirstName: "string"
 *          LastName: "string"
 *          UserName: "string"
 *          Email: "string"
 *          Password: "string"
 *          PasswordHash: "string"
 *          createdAt: "string"
 *          updatedAt: "string"
 *          RoleId: 0
 *          Role:
 *           Id: 0
 *           Name: "string"
 *           createdAt: "string"
 *           updatedAt: "string"
 * 
 *     CreateUpdateDocument:
 *       type: object
 *       required:
 *         - Name
 *         - FilePath
 *         - Status
 *         - UserId
 *       properties:
 *         Id:
 *           type: int
 *           description: The auto-generated id of the document
 *         Name:
 *           type: string
 *           description: The document's name
 *         FilePath:
 *           type: string
 *           description: The document's file path
 *         Status:
 *           type: string
 *           description: The document's status
 *         UserId:
 *           type: int
 *           description: The document's user id
 *       example:
 *         Id: 0
 *         Name: "string"
 *         FilePath: "string"
 *         Status: "string"
 *         UserId: 0
 */

/**
 * @swagger
 * /api/documents/GetAllDocuments:
 *   get:
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: Retrives a list of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 */
documentRouter.get('/GetAllDocuments', documentController.GetAllDocuments);

/**
 * @swagger
 * /api/documents/GetAllDocumentsByUserId/{userId}:
 *   get:
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User Id
 *     responses:
 *       200:
 *         description: Retrives a list of documents by user id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 */
documentRouter.get('/GetAllDocumentsByUserId/:userId', documentController.GetAllDocumentsByUserId);

/**
 * @swagger
 * /api/documents/GetDocument/{id}:
 *   get:
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document Id
 *     responses:
 *       200:
 *         description: Retrives a document by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Document'
 */
documentRouter.get('/GetDocument/:id', documentController.GetDocument);

/**
 * @swagger
 * /api/documents/CreateDocument:
 *   post:
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateDocument'
 *     responses:
 *       200:
 *         description: Create a new document data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Document'
 */
documentRouter.post('/CreateDocument', documentController.CreateDocument);

/**
 * @swagger
 * /api/documents/EditDocument:
 *   put:
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateDocument'
 *     responses:
 *       200:
 *         description: Edit an existing document data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Document'
 */
documentRouter.put('/EditDocument', documentController.EditDocument);

/**
 * @swagger
 * /api/documents/DeleteDocument/{id}:
 *   delete:
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Document Id
 *     responses:
 *       204:
 *         description: Delete an existing document data
 */
documentRouter.delete('/DeleteDocument/:id', documentController.DeleteDocument);

module.exports = documentRouter