const mongoose = require('mongoose');

const salatSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  }, 
  allSalat:[{
    date: {
      type: Date
    },
    salat: {
      fajar: {
        prayed: { type: String,default:"NO"},
        jamat: { type: String,default:"NO"},
        sunnah: { type: String,default:"NO"}
      },
      johor: {
        prayed: { type: String,default:"NO"},
        jamat: { type: String,default:"NO"},
        sunnah: { type: String,default:"NO"}
      },
      asor: {
        prayed: { type: String,default:"NO"},
        jamat: { type: String,default:"NO"},
        sunnah: { type: String,default:"NO"}
      },
      magrib: {
        prayed: { type: String,default:"NO"},
        jamat: { type: String,default:"NO"},
        sunnah: { type: String,default:"NO"}
      },
      esha: {
        prayed: { type: String,default:"NO"},
        jamat: { type: String,default:"NO"},
        sunnah: { type: String,default:"NO"}
      }
    }
  }]
});

module.exports = mongoose.model('salatTables', salatSchema);


