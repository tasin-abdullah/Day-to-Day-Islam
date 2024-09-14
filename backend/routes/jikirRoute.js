// Express
const express = require('express');
const jikirRoute = express();

// Body-Parser
const bodyParser = require('body-parser');
jikirRoute.use(bodyParser.json());
jikirRoute.use(bodyParser.urlencoded({extended:true}));

// Import From Controller
const jikirController = require('../controllers/jikirController');

jikirRoute.post('/jikirTracker',jikirController.createPost);

jikirRoute.put('/jikirTracker',jikirController.getPost);

jikirRoute.patch('/jikirTracker',jikirController.updatePost);

module.exports = jikirRoute;

