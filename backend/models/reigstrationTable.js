const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")


const registrationSchema = mongoose.Schema({
  userName : {
    type: String,
    require : true,
    unique : true
  },
  gmail : {
    type: String,
    require : true
  },
  password : {
    type: String,
    require : true
  }
})

module.exports = mongoose.model("registrationTables",registrationSchema);