const registrationTables = require('../models/reigstrationTable');

const createUser = async(req,res) => {
  try {
    const userData = new registrationTables(req.body)
    const postData = await userData.save();
    res.status(200).send({
      success: true,
      message: `Registration Successfull`,
      data: postData
    });
    ;
  } 
  catch (error) {
    res.status(400).send({
      success: false,
      message: "Use Another User-Name."
    });
  }
}

const findUser = async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const user = await registrationTables.findOne({ userName, password });

    if (user) {
      res.status(200).send({
        success: true,
        message: "User found",
      }); 
    } 
    else {
      res.status(201).send({
        success: false,
        message: "User not found"
      });
    }
  } 
  catch (error) {
    res.status(400).send({
      success: false,
      message: "Internal Server Error"
    });
  }
}

const checkUser = async (req, res) => {
  try {
    const userName = req.body.userName;

    const user = await registrationTables.findOne({userName});

    if (user) {
      res.status(200).send({
        success: false,
        message: "User-Name Isn't Available.",
      });
    } 
    else {
      res.status(201).send({
        success: true,
        message: "User-Name Available.",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Internal Server Error"
    });
  }
}



module.exports = {
  createUser,
  findUser,
  checkUser
}