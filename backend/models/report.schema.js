const mongoose = require('mongoose');
const userSchema = require('./user.schema');

const ReportSchema = new mongoose.Schema({
  description: String,
  reportedBy: { type: userSchema, required: true },
  handledBy: String,
  status: {
    type: String,
    enum: ["Pending", "InProcess", "Fixed"],
    default: "Pending",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
  reportImage: String ,
  location: {
    lat: Number,
    lng: Number,
  },
  reportType: {
    type: String,
    enum: [
      "manager",
      "general",
      "crash",
      "water",
      "trash",
      "electricity",
      "pavement",
      "street light",
      "traffic light",
      "sewage",
      "tree",
      "sign",
    ],
  },
  address:String
});
module.exports=mongoose.model('Report',ReportSchema)
