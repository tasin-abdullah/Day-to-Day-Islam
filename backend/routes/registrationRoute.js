const express = require('express');
const registrationRoute = express();

// Body-Parser
const bodyParser = require("body-parser");
registrationRoute.use(bodyParser.json());
registrationRoute.use(bodyParser.urlencoded({extended:true}));

// Import From Controller
const registrationController = require('../controllers/registrationController');

registrationRoute.post('/registration',registrationController.createUser);

registrationRoute.post('/logIn',registrationController.findUser);

registrationRoute.put('/logIn',registrationController.checkUser)

module.exports = registrationRoute;