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
  const { typeJob, location } = req.params;

  try {
    const worker = await WorkerService.getWorkersByTypeJobAndLocation(typeJob, location);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.json(worker);
  } catch (error) {
    console.error("Failed to get Worker:", error.message);
    res.status(500).json({ message: error.message || "Failed to get worker" });
  }
};

exports.getWorkerByGoogleId = async (req, res) => {
  const { googleId } = req.params;
  try {
    const user = await WorkerService.getWorkerByGoogleId(googleId);
    if (!user) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Failed to get Worker:", error.message);
    res.status(500).json({ message: error.message || "Failed to get Worker" });
  }
};

exports.getWorkersById = async (req, res) => {
  const { id } = req.params;
  try {
    const worker = await WorkerService.getWorkersById(id);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.json(worker);
  } catch (error) {
    console.error("Failed to get Worker by ID:", error.message);
    res.status(500).json({ message: error.message || "Failed to get Worker" });
  }
};
