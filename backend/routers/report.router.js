const express = require("express")
const router = express.Router()
const {addReport,updateReport,deleteReport,getAllReports, getReportByCity, getReportByHandled,} = require("../controllers/report.controller");

router.post('/', addReport);
router.put('/', updateReport);
router.delete('/:reportId', deleteReport);
router.get('/', getReportByHandled);
router.get('/getReportByHandled/:handled',getReportByHandled);
router.get('/:city', getReportByCity);


module.exports = router