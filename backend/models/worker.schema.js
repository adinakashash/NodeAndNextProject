 
const mongoose = require("mongoose");
const User = require("./user.schema");

const typeWorkerEnum = [
    "Traffic Engineer",
    "Plumber",
    "Sanitation Worker",
    "Electrician",
    "Road Worker",
    "Sewage Worker",
    "Arborist",
    "Sign Technician"
];

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
