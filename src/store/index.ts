import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "../features/RegisterSlice.ts";

const store = configureStore({
    reducer: {
        registerFields: RegisterSlice,
    },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;