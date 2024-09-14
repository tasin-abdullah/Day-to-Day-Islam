const salatTables = require('../models/salatTable');

const createSalat = async(req,res) => {
  try {
    const salatData = new salatTables(req.body);
    const updatedSalat = await salatData.save();
    res.status(200).send({
      success: true,
      message: "Salat Table Initiated",
      data: updatedSalat
    });
  } 
  catch (error) {
    res.status(400).send({
      success: false,
      message: "Salat Table Is Not Created."
    });
  }
}

const getSalat = async (req,res) => {
  try {
    const {userName} = req.body;

    const salatData = await salatTables.findOne({userName});

    if(salatData){
      res.status(200).send({
        Success: true,
        message: "Data Found",
        data: salatData
      })
    }
    else {
      res.status(201).send({
        Success: false,
        message: "Data Not Found",
      });
    }
  }
  catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error"
    });
  }
}

const updateSalat = async(req,res) => {

  try {
    const {userName,allSalat} = req.body;
    const updatedSalat = await salatTables.findOneAndUpdate({userName},{$set:{allSalat}}); 

    res.status(200).send({
      success: true,
      message: "Salat Updated Successfully.",
      data: updatedSalat
    })
  } 
  catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  createSalat,
  getSalat,
  updateSalat
}