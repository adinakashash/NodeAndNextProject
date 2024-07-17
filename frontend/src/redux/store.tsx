import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import workerSlice from "./slices/workerSlice";
import reportSlice from "./slices/reportSlice";

const store = configureStore({
    reducer: {
        userSlice,
        reports: reportSlice,
        workers: workerSlice        
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;

