const express = require("express")
const router = express.Router()
const {deleteWorker,getAllWorkers, getWorkersByTypeJobAndLocation, addWorker} = require("../controllers/worker.controller");

router.delete('/:WorkerId', deleteWorker);
router.get('/', getAllWorkers);
router.get('/:typeJob/:location', getWorkersByTypeJobAndLocation);
router.post('/', addWorker);

module.exports = router