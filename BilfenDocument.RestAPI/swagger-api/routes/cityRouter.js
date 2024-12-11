const cityController = require('../controllers/cityController.js');
const cityRouter = require('express').Router();

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
 *     City:
 *       type: object
 *       required:
 *         - Name
 *         - createdAt
 *         - updatedAt
 *         - CountryId
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the city
 *         Name:
 *           type: string
 *           description: The city's name
 *         createdAt:
 *           type: string
 *           description: The city's created date
 *         updatedAt:
 *           type: string
 *           description: The city's updated date
 *         CountryId:
 *           type: string
 *           description: The city's country id
 *         Country:
 *           type: object
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Country'
 *       example:
 *         Id: "string"
 *         Name: "string"
 *         createdAt: "string"
 *         updatedAt: "string"
 *         CountryId: "string"
 *         Country:
 *          Id: "string"
 *          Name: "string"
 *          createdAt: "string"
 *          updatedAt: "string"
 *     
 *     CreateUpdateCity:
 *       type: object
 *       required:
 *         - Name
 *         - CountryId
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the city
 *         Name:
 *           type: string
 *           description: The city's name
 *         CountryId:
 *           type: string
 *           description: The city's country id
 *       example:
 *         Id: "string"
 *         Name: "string"
 *         CountryId: "string"
 */

/**
 * @swagger
 * /api/cities/GetAllCities:
 *   get:
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: Retrives a list of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 */
cityRouter.get('/GetAllCities', cityController.GetAllCities);

/**
 * @swagger
 * /api/cities/GetAllCitiesByCountryId/{countryId}:
 *   get:
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: countryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Country Id
 *     responses:
 *       200:
 *         description: Retrives cities by country id
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/City'
 */
cityRouter.get('/GetAllCitiesByCountryId/:countryId', cityController.GetAllCitiesByCountryId);

/**
 * @swagger
 * /api/cities/GetCity/{id}:
 *   get:
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: City Id
 *     responses:
 *       200:
 *         description: Retrives a city by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/City'
 */
cityRouter.get('/GetCity/:id', cityController.GetCity);

/**
 * @swagger
 * /api/cities/CreateCity:
 *   post:
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateCity'
 *     responses:
 *       200:
 *         description: Create a new city data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/City'
 */
cityRouter.post('/CreateCity', cityController.CreateCity);

/**
 * @swagger
 * /api/cities/EditCity:
 *   put:
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateCity'
 *     responses:
 *       200:
 *         description: Edit an existing city data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/City'
 */
cityRouter.put('/EditCity', cityController.EditCity);

/**
 * @swagger
 * /api/cities/DeleteCity/{id}:
 *   delete:
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: City Id
 *     responses:
 *       200:
 *         description: Delete an existing city data
 */
cityRouter.delete('/DeleteCity/:id', cityController.DeleteCity);

module.exports = cityRouter