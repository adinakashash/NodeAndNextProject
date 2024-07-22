const express = require("express");
const router = express.Router();
const { 
  deleteWorker, 
  getAllWorkers, 
  getWorkersByTypeJobAndLocation, 
  addWorker, 
  getWorkersById, 
  getWorkerByGoogleId 
} = require("../controllers/worker.controller");

router.get('/', getAllWorkers);
router.get('/google/:googleId', getWorkerByGoogleId); 
router.get('/:typeJob/:location', getWorkersByTypeJobAndLocation);
router.get('/:id', getWorkersById);
router.post('/', addWorker);
router.delete('/:workerId', deleteWorker);

module.exports = router;
