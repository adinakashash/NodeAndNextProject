const WorkerService = require('../services/worker.service');


exports.addWorker = async (req, res) => {
  try {
    const rep = await WorkerService.addWorker(req.body);
    res.json(rep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteWorker = async (req, res) => {
  const workerId = req.params.workerId;
  try {
    const deletedWorker = await WorkerService.deleteWorker(workerId);
    if (!deletedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.json({ message: "Worker deleted successfully" });
  } catch (error) {
    console.error("Failed to delete Worker:", error.message);
    res.status(500).json({ message: error.message || "Failed to delete Worker" });
  }
};

exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await WorkerService.getAllWorkers();
    res.json(workers);
  } catch (error) {
    console.error("Failed to get Workers:", error.message);
    res.status(500).json({ message: error.message || "Failed to get workers" });
  }
};

exports.getWorkersByTypeJobAndLocation = async (req, res) => {
  const { TypeJob ,location} = req.params;

  try {
    const worker = await WorkerService.getWorkersByTypeJobAndLocation(TypeJob,location);
    if (!worker) {
      return res.status(404).json({ message: "worker not found" });
    }
    res.json(worker);
  } catch (error) {
    console.error("Failed to get worker:", error.message);
    res.status(500).json({ message: error.message || "Failed to get worker" });
  }
};
