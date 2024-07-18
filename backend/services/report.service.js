const mongoose = require('mongoose');
const Report = require("../models/report.schema");

exports.addReport = async (reportData) => {
  const { location } = reportData;
  try {
    const existingReport = await Report.findOne({ location });
    if (existingReport) {
      throw new Error('Location already exists');
    }   
    const newReport = new Report({
      ...reportData
    });
    const result = await newReport.save();
    return result;
  } catch (error) {
    throw new Error('Error occurred while adding the report');
  }

};


exports.deleteReport = async (reportId) => {
  try {
    const deleteReport = await Report.findOneAndDelete({ _id: reportId });
    if (!deleteReport) {
      throw new Error("reportId not found");
    }
    return deleteReport;
  } catch (error) {
    console.error("Failed to delete report:", error);
    throw new Error( "Failed to delete report");
  }
};

exports.getAllReports = async () => {
  try {
    return await Report.find();
  } catch (error) {
    console.error("Failed to get reports:", error);
    throw new Error( "Failed to get reports");
  }
};

exports.updateReport = async (reportData) => {
  const { handledBy, status, _id } = reportData;
    const updateData = {
    handledBy:handledBy,
    status: status,
  };
  try {
    const updatedReport = await Report.findOneAndUpdate(
      { _id: _id },
      { $set: updateData },
      { new: true }
    );
    if (!updatedReport) {
      throw new Error("Report not found");
    }
    
    return updatedReport;
  } catch (error) {
    console.error("Failed to update report:", error);
    throw new Error("Failed to update report");
  }
};



exports.getReportByCity = async (city) => {
  try {
    const regex = new RegExp(city, 'i'); 
    const reports = await Report.find({ address: { $regex: regex } });
    return reports;
  } catch (error) {
    console.error("Failed to get reports by city:", error);
    throw new Error("Failed to get reports by city");
  }
};

