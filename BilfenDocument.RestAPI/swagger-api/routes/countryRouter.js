const countryController = require('../controllers/countryController.js');
const countryRouter = require('express').Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *         - Name
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the country
 *         Name:
 *           type: string
 *           description: The country's name
 *         createdAt:
 *           type: string
 *           description: The country's created date
 *         updatedAt:
 *           type: string
 *           description: The country's updated date
 *       example:
 *         Id: "string"
 *         Name: "string"
 *         createdAt: "string"
 *         updatedAt: "string"
 *     
 *     CreateUpdateCountry:
 *       type: object
 *       required:
 *         - Name
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the country
 *         Name:
 *           type: string
 *           description: The country's name
 *       example:
 *         Id: "string"
 *         Name: "string"
 */

/**
 * @swagger
 * /api/countries/GetAllCountries:
 *   get:
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: Retrives a list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 */
countryRouter.get('/GetAllCountries', countryController.GetAllCountries);

/**
 * @swagger
 * /api/countries/GetCountry/{id}:
 *   get:
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Country Id
 *     responses:
 *       200:
 *         description: Retrives a country by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Country'
 */
countryRouter.get('/GetCountry/:id', countryController.GetCountry);

/**
 * @swagger
 * /api/countries/CreateCountry:
 *   post:
 *     tags: [Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateCountry'
 *     responses:
 *       200:
 *         description: Create a new country data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Country'
 */
countryRouter.post('/CreateCountry', countryController.CreateCountry);

/**
 * @swagger
 * /api/countries/EditCountry:
 *   put:
 *     tags: [Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateCountry'
 *     responses:
 *       200:
 *         description: Edit an existing country data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Country'
 */
countryRouter.put('/EditCountry', countryController.EditCountry);

/**
 * @swagger
 * /api/countries/DeleteCountry/{id}:
 *   delete:
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Country Id
 *     responses:
 *       200:
 *         description: Delete an existing country data
 */
countryRouter.delete('/DeleteCountry/:id', countryController.DeleteCountry);

module.exports = countryRouter