import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import {  ReportClass } from "@/classes/report";
import { useDispatch } from "react-redux";
const http = "http://localhost:3000";

const initialState = {
  reports: [] 
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports(state, action) {
      state.reports = action.payload;
    }
  }
});


export const {} = reportSlice.actions;
export const selectReports = (state: RootState) => state.reports;
export default reportSlice.reducer;

export const getReportByCity = createAsyncThunk('', async (city:string,{ dispatch }) => {
  try {    
    const response = await axios.get(`${http}/reports/${city}`);
    const data= response.data;    
    dispatch(reportSlice.actions.setReports(data));      
    return data;
  } catch (error) {
    throw error;
  }
});
export const addReport = createAsyncThunk("", async (_report: ReportClass) => {
  try {  
    const response = await axios.post(`${http}/reports`, _report);
    return response.data;
  } catch (error) {
    return error;
  }
});


export const deleteReport= createAsyncThunk("", async (reportId:string) => {
  try {
    const response = await axios.delete(`${http}/reports/${reportId}`);
    return response.data;
  } catch (error) {
    return error;
  }
});