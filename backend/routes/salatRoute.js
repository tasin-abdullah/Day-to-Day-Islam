const express = require("express");
const salatRoute = express();

const bodyParser = require("body-parser");
salatRoute.use(bodyParser.json());
salatRoute.use(bodyParser.urlencoded({extended: true}));

const salatController = require('../controllers/salatController');

salatRoute.post('/salatSaver',salatController.createSalat);

salatRoute.put('/salatSaver',salatController.getSalat);

salatRoute.patch('/salatSaver',salatController.updateSalat);


module.exports = salatRoute;