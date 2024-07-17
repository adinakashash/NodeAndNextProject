import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { Location, ReportClass } from "@/classes/report";
import { useDispatch } from "react-redux";
const http = "http://localhost:3000";
const { data = {} } = [];

const reportSlice = createSlice({
  name: "reports",
  initialState: data,
  reducers: {
    setReports(state, action) {  
      console.log(action.payload);
       
      state.reports = action.payload;
      console.log(state.reports);
                
    },
  },
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
