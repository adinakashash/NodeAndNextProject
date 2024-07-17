const reportService = require('../services/report.service');

exports.addReport = async (req, res) => {
  try {
    console.log(req.body);
    const rep = await reportService.addReport(req.body);
    console.log(rep);
    res.json(rep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReport = async (req, res) => {
  const { reportId } = req.params;
  const { handledBy , status } = req.body;
  try {
    const updatedReport = await reportService.updateReport(reportId, { handledBy, status });
    if (!updatedReport) {
      return res.status(404).json({ message: "report not found" });
    }
    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const report = await reportService.getAllReports();
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  const reportId = req.params.reportId;
  try {
    const deletedReport = await reportService.deleteReport(reportId);
    if (!deletedReport) {
      return res.status(404).json({ message: "report not found" });
    }
    res.json({ message: "report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

exports.getReportByCity = async (req, res) => {
  const city= req.params.city;
  try {
    console.log(city);
    const reports = await reportService.getReportByCity(city);
    if (!reports.length) {
      return res.status(404).json({ message: "No reports found for the given city" });
    }
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
