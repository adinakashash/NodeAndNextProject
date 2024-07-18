 
const mongoose = require("mongoose");
const User = require("./user.schema");
const typeWorkerEnum = [
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
]

const WorkerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  typeEmployee: {
    type: [String],
    enum: typeWorkerEnum
  },
  workerLocation: String,
  workerID: String
});

module.exports = mongoose.model('Worker', WorkerSchema);