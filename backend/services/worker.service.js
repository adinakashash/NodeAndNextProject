const Worker = require("../models/worker.schema");
require('dotenv').config();

exports.addWorker = async (worker) => {
  try {  
      const newWorker = new Worker({...worker});
      const result = await newWorker.save();
      return result;
  } catch (error) {
      console.error('Error details:', error); 
      throw new Error('Error occurred while adding the worker');
  }
};

exports.deleteWorker = async (WorkerId) => {
  try {
    const deletedWorker = await Worker.findOneAndDelete({ WorkerId: WorkerId });
    if (!deletedWorker) {
      throw new Error("Worker not found");
    }
    return deletedWorker;
  } catch (error) {
    console.error("Failed to delete Worker:", error.message);
    throw new Error(error.message || "Failed to delete Worker");
  }
};

exports.getAllWorkers = async () => {
  try {
    return await Worker.find();
  } catch (error) {
    console.error("Failed to get Workers:", error.message);
    throw new Error(error.message || "Failed to get Workers");
  }
};



exports.getWorkersByTypeJobAndLocation = async (typeWorker, city) => {
  try {

    const workers = await Worker.find({ typeWorker: { $in: [typeWorker] } });
    const filteredWorkers = workers.filter(worker => worker.workerLocation === city);
    if (filteredWorkers.length === 0) {
      throw new Error("No workers found with the specified type and city");
    }
    return filteredWorkers;
  } catch (error) {
    console.error("Failed to get Workers:", error.message);
    throw new Error(error.message || "Failed to get Workers");
  }
};
