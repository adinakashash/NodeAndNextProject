import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import workerSlice from "./slices/workerSlice";
import reportSlice from "./slices/reportSlice";
import currentUserSlice from "./slices/currentUserSlice";

const store = configureStore({
    reducer: {
        userSlice,
        reports: reportSlice,
        workers: workerSlice,
        cuurentuser: currentUserSlice    
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;

