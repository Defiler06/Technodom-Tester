import InputForm from "../../../components/UI/InputForm/InputForm.tsx";
import {
    changePassword,
    changePhone,
    changeShowPasswordInput,
    changeShowRegisterForm
} from "../../../features/LoginSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {FormEvent} from "react";
import {formatedPhoneNumber} from "../../../helpers/formatedNumber.ts";
import ButtonForm from "../../../components/UI/ButtonForm/ButtonForm.tsx";
import '../Auth.css';

const Login = () => {
    const dispatch = useAppDispatch();
    const {password, phoneNumber} = useAppSelector((state) => state.loginFields.user);
    const correctPhoneNumber = useAppSelector((state) => state.loginFields.correctPhoneNumber);
    const showInput = useAppSelector((state) => state.loginFields.showPasswordInput);


    const submitLoginHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (phoneNumber === correctPhoneNumber) {
            dispatch(changeShowPasswordInput(true));
            dispatch(changeShowRegisterForm(false));
        } else {
            dispatch(changeShowRegisterForm(true));
            dispatch(changeShowPasswordInput(false));
        }
    }

    return (
        <form className='form_register' onSubmit={(event) => submitLoginHandler(event)}>
            <p className='title_form'>Авторизация</p>
            <InputForm
                label='Номер телефона'
                name='phone'
                placeholder='Номер телефона'
                type='tel'
                value={phoneNumber.split(' ').join(' ').trim()}
                onInputHandler={(event) => {
                    const formatNumberPhone = formatedPhoneNumber(event.currentTarget.value);
                    dispatch(changePhone(formatNumberPhone));
                    dispatch(changeShowPasswordInput(false));
                    dispatch(changeShowRegisterForm(false));
                }}
            />
            {showInput && <InputForm
                label='Пароль'
                type='password'
                name='password'
                placeholder='Пароль'
                value={password}
                onInputHandler={(event) => {
                    dispatch(changePassword(event.currentTarget.value));
                }}
            />}
            <ButtonForm text='Зарегистрироваться'
                        isDisabled={
                            phoneNumber.length >= 16
                        }/>
            <a href="#" style={{textDecoration: 'none'}}>Восстановление пароля</a>
        </form>
    )
};

export default Login;