// Express
const express = require('express');
const app = express();

// CORS
const cors = require('cors');
app.use(cors({
  origin:"*"
}))

const port = 3200;

// dotENV **** It Only Works On BACKEND ****
require('dotenv').config();

// Body-Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


// DataBase
const mongoose = require('mongoose');
const DB_URL = process.env.MONGO_URL;
mongoose.connect(DB_URL).then(() => {
  console.log(`MongoDB ${DB_URL[7]==':'?"Compass":"Atlas"} Is Connected.`);
}).catch((error) => {
  console.log(error);
  process.exit(1);
});



const jikirRoute = require('./routes/jikirRoute');
const registrationRoute = require('./routes/registrationRoute');
const salatRoute = require('./routes/salatRoute');

app.use('/api',jikirRoute);
app.use('/api',registrationRoute);
app.use('/api',salatRoute);

app.get("/",(req,res) => {
  res.json("Hellow");
})

app.listen(port,() => {
  console.log(`Server is running at http://localhost:${port}`);
});

