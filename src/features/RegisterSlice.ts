import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface State {
    user: IRegisterSlice;
}

const initialState: State = {
    user : {
        username: '',
        phone: '+7',
        email: '',
        isCheck: false,
    }
};

const RegisterSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        changeUsername: (state, action: PayloadAction<string>) => {
            state.user.username = action.payload;
        },
        changePhone: (state, action: PayloadAction<string>) => {
            state.user.phone = action.payload;
        },
        changeEmail: (state, action: PayloadAction<string>) => {
            state.user.email = action.payload;
        },
        changeCheckBox: (state, action: PayloadAction<boolean>) => {
            state.user.isCheck = action.payload;
        },
    },
});

export const {
    changeUsername,
    changePhone,
    changeEmail,
    changeCheckBox
} = RegisterSlice.actions;
export default RegisterSlice.reducer;
