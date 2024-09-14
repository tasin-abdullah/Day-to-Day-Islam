const jikirTables = require('../models/jikirTable');


const createPost = async(req,res) => {

  try {
    const newEntry = new jikirTables({
      userName: req.body.userName
    });
    const newData = await newEntry.save();
    res.status(200).send({
      success: true,
      message: `Data Posted.`,
      data: newData
    });
  } 
  catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
  
}

const getPost = async(req,res) => {
  try {
    const jikirGet = await jikirTables.find({userName: req.body.userName});
    res.status(200).send({
      success: true,
      message: "Jikirs Found",
      data: jikirGet
    });
  } 
  catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
}

const updatePost = async(req,res) => {

  try {
    const {userName,jikir}= req.body;
    const updatedJikir = await jikirTables.findOneAndUpdate({ userName},{$set:{jikir}});
    res.status(200).send({
      success: true,
      message: "Data Updated Successfully",
      data : updatedJikir
    });
  } 
  catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  getPost,
  updatePost,
  createPost
}

