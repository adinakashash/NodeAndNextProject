import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import User from "@/classes/user";
const http = "http://localhost:3000";
// const response = await axios.get(`${http}/users`);
const { data = {} } = [];

const userSlice = createSlice({
  name: "users",
  initialState: data,
  reducers: {},
});

export const {} = userSlice.actions;
export const selectUsers = (state: RootState) => state.userSlice.users;
export default userSlice.reducer;

export const createUser = createAsyncThunk("", async (_user: User) => {
  try {    
    const response = await axios.post(`${http}/users/signup`, _user);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const editTaskManager = createAsyncThunk("", async () => {
  try {
    const response = await axios.put(`${http}/tasks/manager/task`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const deleteTask = createAsyncThunk("", async () => {
  try {
    const response = await axios.delete(http + ``);
    return response.data;
  } catch (error) {
    return error;
  }
});
