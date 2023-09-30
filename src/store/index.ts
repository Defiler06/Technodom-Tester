import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "../features/RegisterSlice.ts";
import LoginSlice from "../features/LoginSlice.ts";

const store = configureStore({
    reducer: {
        registerFields: RegisterSlice,
        loginFields: LoginSlice,
    },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;