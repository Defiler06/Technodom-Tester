import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import ILogin from "../interfaces/ILogin.ts";

interface State {
    user: ILogin;
    correctPhoneNumber: string;
    showRegisterForm: boolean;
    showPasswordInput: boolean
}

const initialState: State = {
    user: {
        phoneNumber: '+7',
        password: ''
    },
    correctPhoneNumber: '+7 777 777 77 77',
    showRegisterForm: false,
    showPasswordInput: false
};

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        changePassword: (state, action: PayloadAction<string>) => {
            state.user.password = action.payload;
        },
        changePhone: (state, action: PayloadAction<string>) => {
            state.user.phoneNumber = action.payload;
        },
        changeShowRegisterForm: (state, action: PayloadAction<boolean>) => {
            state.showRegisterForm = action.payload;
        },
        changeShowPasswordInput: (state, action: PayloadAction<boolean>) => {
            state.showPasswordInput = action.payload;
        },
    },
});

export const {
    changePassword,
    changePhone,
    changeShowPasswordInput,
    changeShowRegisterForm
} = LoginSlice.actions;
export default LoginSlice.reducer;
