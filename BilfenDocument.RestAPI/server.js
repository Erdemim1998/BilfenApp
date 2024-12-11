const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('./swagger-api/models/index.js');
const documentRouter = require('./swagger-api/routes/documentRouter.js');
const roleRouter = require('./swagger-api/routes/roleRouter.js');
const userRouter = require('./swagger-api/routes/userRouter.js');
const cityRouter = require('./swagger-api/routes/cityRouter.js');
const countryRouter = require('./swagger-api/routes/countryRouter.js');
const districtRouter = require('./swagger-api/routes/districtRouter.js');
var port = process.env.PORT || 1337;

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bilfen API',
            version: 'v1'
        }
    },
    apis: ['./swagger-api/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors(), express.json(), express.urlencoded({ extended: true }), (req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    next();
});
app.use(express.json({ type: 'application/json', charset: 'utf-8' }));
app.use('/api/documents', documentRouter);
app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
app.use('/api/cities', cityRouter);
app.use('/api/countries', countryRouter);
app.use('/api/districts', districtRouter);

app.get("/", (req, res) => {
    res.redirect("/api-docs");
});

app.listen(port, () => {
    console.log(`Server is running on port ${ port }`);
});