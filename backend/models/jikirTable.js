const mongoose = require('mongoose');

const jikirSchema = mongoose.Schema({
  userName : {
    type: String,
    require : true,
    unique : true
  },
  jikir :[{
    name : {
      type: String,
      required : true
    },
    totalCount :{
      type: Number,
      default: 0,
    },
    monthlyCount :{
      type: Number,
      default: 0 
    },
    weeklyCount :{
      type: Number,
      default: 0 
    },
    dailyCount :{
      type: Number,
      default: 0 
    }
  }],
  createdAt :{
    type: Date,
    default: Date.now()
  }
}) 

jikirSchema.pre('save', function (next) {
  if (this.isNew && this.jikir.length === 0) {
    this.jikir.push({ name: 'Subhan Allah' });
    this.jikir.push({ name: 'Alhamdulillah' });
    this.jikir.push({ name: 'Allahu Akbar' });
  }
  next();
}); 

module.exports = mongoose.model("jikirTables",jikirSchema);

