import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { WorkerClass } from "@/classes/worker";

const http = "http://localhost:3000";
const initialState: WorkerClass[] = []; 

const workerslice = createSlice({
  name: "workers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorkers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getWorkersByTypeJobAndLocation.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addWorker.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteWorker.fulfilled, (state, action) => {
        return state.filter(worker => worker.workerID !== action.meta.arg);
      });
  }
});

export const selectWorkers = (state: RootState) => state.workers; 
export default workerslice.reducer;

export const getAllWorkers = createAsyncThunk("workers/getAllWorkers", async () => {
  try {
    const response = await axios.get(`${http}/workers`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

interface GetWorkersArgs {
  typeJob: string;
  location: string;
}

export const getWorkersByTypeJobAndLocation = createAsyncThunk(
  "workers/getByTypeJobAndLocation",
  async ({ typeJob, location }: GetWorkersArgs, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${http}/workers/${typeJob}/${location}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getWorkersById= createAsyncThunk(
  "workers/getByTypeJobAndLocation",
  async (id:String|undefined) => {
    try {
      const response = await axios.get(`${http}/workers/${id}`);
      return response.data;
    } catch (error: any) {
      return isRejectedWithValue(error.response?.data || error.message);
    }
  }
);


export const addWorker = createAsyncThunk("workers/addWorker", async (_worker: WorkerClass) => {
  try {
    const response = await axios.post(`${http}/workers`, _worker);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteWorker = createAsyncThunk("workers/deleteWorker", async (id: string) => {
  try {
    const response = await axios.delete(`${http}/workers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
