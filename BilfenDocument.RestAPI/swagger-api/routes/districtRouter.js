const districtController = require('../controllers/districtController.js');
const districtRouter = require('express').Router();

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
 *     District:
 *       type: object
 *       required:
 *         - Name
 *         - createdAt
 *         - updatedAt
 *         - CityId
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the district
 *         Name:
 *           type: string
 *           description: The district's name
 *         createdAt:
 *           type: string
 *           description: The district's created date
 *         updatedAt:
 *           type: string
 *           description: The district's updated date
 *         CityId:
 *           type: string
 *           description: The district's city id
 *         City:
 *           type: object
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/City'
 *       example:
 *         Id: "string"
 *         Name: "string"
 *         createdAt: "string"
 *         updatedAt: "string"
 *         CityId: "string"
 *         City:
 *          Id: "string"
 *          Name: "string"
 *          createdAt: "string"
 *          updatedAt: "string"
 *          CountryId: "string"
 *          Country:
 *           Id: "string"
 *           Name: "string"
 *           createdAt: "string"
 *           updatedAt: "string"
 *     
 *     CreateUpdateDistrict:
 *       type: object
 *       required:
 *         - Name
 *         - CityId
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the district
 *         Name:
 *           type: string
 *           description: The district's name
 *         CityId:
 *           type: string
 *           description: The district's city id
 *       example:
 *         Id: "string"
 *         Name: "string"
 *         CityId: "string"
 */

/**
 * @swagger
 * /api/districts/GetAllDistricts:
 *   get:
 *     tags: [Districts]
 *     responses:
 *       200:
 *         description: Retrives a list of districts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/District'
 */
districtRouter.get('/GetAllDistricts', districtController.GetAllDistricts);

/**
 * @swagger
 * /api/districts/GetAllDistrictsByCityId/{cityId}:
 *   get:
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: cityId
 *         required: true
 *         schema:
 *           type: string
 *         description: City Id
 *     responses:
 *       200:
 *         description: Retrives districts by city id
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/District'
 */
districtRouter.get('/GetAllDistrictsByCityId/:cityId', districtController.GetAllDistrictsByCityId);

/**
 * @swagger
 * /api/districts/GetDistrict/{id}:
 *   get:
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District Id
 *     responses:
 *       200:
 *         description: Retrives a district by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/District'
 */
districtRouter.get('/GetDistrict/:id', districtController.GetDistrict);

/**
 * @swagger
 * /api/districts/CreateDistrict:
 *   post:
 *     tags: [Districts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateDistrict'
 *     responses:
 *       200:
 *         description: Create a new district data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/District'
 */
districtRouter.post('/CreateDistrict', districtController.CreateDistrict);

/**
 * @swagger
 * /api/districts/EditDistrict:
 *   put:
 *     tags: [Districts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateDistrict'
 *     responses:
 *       200:
 *         description: Edit an existing district data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/District'
 */
districtRouter.put('/EditDistrict', districtController.EditDistrict);

/**
 * @swagger
 * /api/districts/DeleteDistrict/{id}:
 *   delete:
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District Id
 *     responses:
 *       200:
 *         description: Delete an existing district data
 */
districtRouter.delete('/DeleteDistrict/:id', districtController.DeleteDistrict);

module.exports = districtRouter