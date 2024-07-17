const express = require("express")
const router = express.Router()
const {addReport,updateReport,deleteReport,getAllReports, getReportByCity} = require("../controllers/report.controller");

router.post('/', addReport);
router.put('/updateReport', updateReport);
router.delete('/:reportId', deleteReport);
router.get('/', getAllReports);
router.get('/:city', getReportByCity);


module.exports = router