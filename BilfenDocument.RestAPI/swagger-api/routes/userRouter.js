const userController = require('../controllers/userController.js');
const userRouter = require('express').Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - FirstName
 *         - LastName
 *         - UserName
 *         - Email
 *         - Password
 *         - PasswordHash
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         Id:
 *           type: int
 *           description: The auto-generated id of the user
 *         FirstName:
 *           type: string
 *           description: The user's first name
 *         LastName:
 *           type: string
 *           description: The user's last name
 *         UserName:
 *           type: string
 *           description: The user's user name
 *         Email:
 *           type: string
 *           description: The user's email
 *         Password:
 *           type: string
 *           description: The user's password
 *         PasswordHash:
 *           type: string
 *           description: The user's hash password
 *         createdAt:
 *           type: string
 *           description: The user's created date
 *         updatedAt:
 *           type: string
 *           description: The user's updated date
 *         RoleId:
 *           type: int
 *           description: The user's role id
 *         Role:
 *           type: object
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Role'
 *       example:
 *         Id: 0
 *         FirstName: "string"
 *         LastName: "string"
 *         UserName: "string"
 *         Email: "string"
 *         Password: "string"
 *         PasswordHash: "string"
 *         createdAt: "string"
 *         updatedAt: "string"
 *         RoleId: 0
 *         Role:
 *          Id: 0
 *          Name: "string"
 *          createdAt: "string"
 *          updatedAt: "string"
 *     
 *     CreateUpdateUser:
 *       type: object
 *       required:
 *         - FirstName
 *         - LastName
 *         - UserName
 *         - Email
 *         - Password
 *         - RoleId
 *       properties:
 *         Id:
 *           type: int
 *           description: The auto-generated id of the user
 *         FirstName:
 *           type: string
 *           description: The user's first name
 *         LastName:
 *           type: string
 *           description: The user's last name
 *         UserName:
 *           type: string
 *           description: The user's user name
 *         Email:
 *           type: string
 *           description: The user's email
 *         Password:
 *           type: string
 *           description: The user's password
 *         RoleId:
 *           type: int
 *           description: The user's role id
 *       example:
 *         Id: 0
 *         FirstName: "string"
 *         LastName: "string"
 *         UserName: "string"
 *         Email: "string"
 *         Password: "string"
 *         RoleId: 0
 * 
 *     Login:
 *       type: object
 *       required:
 *         - Email
 *         - Password
 *       properties:
 *         Email:
 *           type: string
 *           description: The user's email
 *         Password:
 *           type: string
 *           description: The user's password
 *       example:
 *         Email: "string"
 *         Password: "string"
 *      
 *     LoginAuthenticate:
 *       type: object
 *       required:
 *         - token
 *         - isAuthenticated
 *         - userId
 *       properties:
 *         token:
 *           type: string
 *           description: The user's JWT
 *         isAuthenticated:
 *           type: boolean
 *           description: The user's authenticated info
 *         userId:
 *           type: integer
 *           description: The user's id
 *       example:
 *         token: "string"
 *         isAuthenticated: false
 *         userId: 0
 *     
 *     SendEmail:
 *       type: object
 *       required:
 *         - DocumentName
 *         - CreateDate
 *         - ToUserFirstName
 *         - ToUserLastName
 *         - ToUserEmail
 *         - FromUserEmail
 *         - FromUserFirstName
 *         - FromUserLastName
 *         - MailType
 *       properties:
 *         DocumentName:
 *           type: string
 *           description: The email's document name
 *         CreateDate:
 *           type: string
 *           description: The email's created date
 *         ToUserFirstName:
 *           type: string
 *           description: The email's to user's first name
 *         ToUserLastName:
 *           type: string
 *           description: The email's to user's last name
 *         ToUserEmail:
 *           type: string
 *           description: The email's to user's email
 *         FromUserEmail:
 *           type: string
 *           description: The email's from user's email
 *         FromUserFirstName:
 *           type: string
 *           description: The email's from user's first name
 *         FromUserLastName:
 *           type: string
 *           description: The email's from user's last name
 *         MailType:
 *           type: string
 *           description: The email's mail type
 *       example:
 *         DocumentName: "string"
 *         CreateDate: "string"
 *         ToUserFirstName: "string"
 *         ToUserLastName: "string"
 *         ToUserEmail: "string"
 *         FromUserEmail: "string"
 *         FromUserFirstName: "string"
 *         FromUserLastName: "string"
 *         MailType: "string"
 * 
 *     UsernameEmail:
 *       type: object
 *       required:
 *         - UserName
 *         - Email
 *       properties:
 *         UserName:
 *           type: string
 *           description: The user's user name
 *         Email:
 *           type: string
 *           description: The user's email
 *       example:
 *         UserName: "string"
 *         Email: "string"
 * 
 *     SendNotification:
 *       type: object
 *       required:
 *         - PublicKey
 *         - PrivateKey
 *         - IsApprove
 *         - Subscription
 *         - endpoint
 *         - expirationTime
 *         - keys
 *         - auth
 *         - p256dh
 *       properties:
 *         IsApprove:
 *           type: boolean
 *           description: IsApprove information
 *         PublicKey:
 *           type: string
 *           description: Public vapid key information
 *         PrivateKey:
 *           type: string
 *           description: Private vapid key information
 *         Subscription:
 *           type: object
 *           description: Notification subscription informations
 *         endpoint:
 *           type: string
 *           description: Notification endpoint information
 *         expirationTime:
 *           type: Date
 *           description: Notification endpoint information
 *         keys:
 *           type: object
 *           description: Notification key informations
 *         auth:
 *           type: string
 *           description: Notification auth information
 *         p256dh:
 *           type: string
 *           description: Notification p256dh information
 *       example:
 *         IsApprove: false
 *         PublicKey: "string"
 *         PrivateKey: "string"
 *         Subscription:
 *           endpoint: "string"
 *           expirationTime: null
 *           keys:
 *             auth: "string"
 *             p256dh: "string"
 * 
 *     Message:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: Code information
 *         message:
 *           type: string
 *           description: Message information
 *       example:
 *         code: 0
 *         message: "string"
 */

/**
 * @swagger
 * /api/users/GetAllUsers:
 *   get:
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Retrives a list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/GetAllUsers', userController.GetAllUsers);

/**
 * @swagger
 * /api/users/GetUser/{id}:
 *   get:
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User Id
 *     responses:
 *       200:
 *         description: Retrives a user by id
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/GetUser/:id', userController.GetUser);

/**
 * @swagger
 * /api/users/Login:
 *   post:
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Create a new user data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/LoginAuthenticate'
 */
userRouter.post('/Login', userController.Login);

/**
 * @swagger
 * /api/users/CreateUser:
 *   post:
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateUser'
 *     responses:
 *       200:
 *         description: Create a new user data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.post('/CreateUser', userController.CreateUser);

/**
 * @swagger
 * /api/users/EditUser:
 *   put:
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUpdateUser'
 *     responses:
 *       200:
 *         description: Edit an existing user data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.put('/EditUser', userController.EditUser);

/**
 * @swagger
 * /api/users/DeleteUser/{id}:
 *   delete:
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User Id
 *     responses:
 *       200:
 *         description: Delete an existing user data
 */
userRouter.delete('/DeleteUser/:id', userController.DeleteUser);

/**
 * @swagger
 * /api/users/GetVapidKeys:
 *   get:
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Public and private vapid key for notification
 */
userRouter.get('/GetVapidKeys', userController.GetVapidKeys);

/**
 * @swagger
 * /api/users/SendNotification:
 *   post:
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendNotification'
 *     responses:
 *       200:
 *         description: Notification sending information
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Message'
 */
userRouter.post('/SendNotification', userController.SendNotification);

/**
 * @swagger
 * /api/users/SendEmail:
 *   post:
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendEmail'
 *     responses:
 *       200:
 *         description: Email sending information
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Message'
 */
userRouter.post('/SendEmail', userController.SendEmail);

module.exports = userRouter