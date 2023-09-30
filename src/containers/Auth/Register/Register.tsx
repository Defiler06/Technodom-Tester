import '../Auth.css';
import InputForm from "../../../components/UI/InputForm/InputForm.tsx";
import {useAppSelector, useAppDispatch} from "../../../store/hooks.ts";
import {changeCheckBox, changeEmail, changePhone, changeUsername} from "../../../features/RegisterSlice.ts";
import {FormEvent, useState} from "react";
import validator from 'validator';
import ButtonForm from "../../../components/UI/ButtonForm/ButtonForm.tsx";
import {formatedPhoneNumber} from "../../../helpers/formatedNumber.ts";
import {message} from "antd";

const Register = () => {
    const dispatch = useAppDispatch();
    const {username, email, phone, isCheck} = useAppSelector((state) => state.registerFields.user);

    const [phoneError, setPhoneError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');

    const submitLoginHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validator.isEmail(email) ? setEmailError('') : setEmailError('Невалидный email');

        const isPhoneValid = validator.isMobilePhone(phone);
        isPhoneValid || phone.length < 16 ? setPhoneError('Неправильный формат номера') : setPhoneError('');

        username.trim() === '' ? setUsernameError('Имя обязательное') : setUsernameError('');

        if (validator.isEmail(email) && !isPhoneValid && phone.length >= 16  && username.trim() !== '') {
            dispatch(changePhone(''));
            dispatch(changeEmail(''));
            dispatch(changeUsername(''));
            dispatch(changeCheckBox(false));
            message.destroy();
            void message.success("Успешная регистрация!", 3);
        }
    }


    return (
        <form className='form_register' onSubmit={(event) => submitLoginHandler(event)}>
            <p className='title_form'>Регистрация</p>
            <InputForm
                label='Имя'
                name='username'
                placeholder='Имя'
                type='text'
                value={username}
                onInputHandler={(event) => {
                    setUsernameError('');
                    dispatch(changeUsername(event.currentTarget.value));
                }}
                error={usernameError}
            />
            <InputForm
                label='Номер телефона'
                name='phone'
                placeholder='Номер телефона'
                type='tel'
                value={phone.split(' ').join(' ').trim()}
                onInputHandler={(event) => {
                    setPhoneError('');
                    const formatNumberPhone = formatedPhoneNumber(event.currentTarget.value);
                    dispatch(changePhone(formatNumberPhone));
                }}
                error={phoneError}
            />
            <InputForm
                label='Email'
                name='email'
                placeholder='Email'
                value={email}
                onInputHandler={(event) => {
                    setEmailError('');
                    dispatch(changeEmail(event.currentTarget.value));
                }}
                error={emailError}
            />
            <label className="checkbox-container">
                <input type="checkbox" checked={isCheck} onChange={() => dispatch(changeCheckBox(!isCheck))}/>
                <span className="checkmark"></span>
                Настоящим я подтверждаю, что ознакомлен и согласен с условиями
            </label>
            <ButtonForm text='Зарегистрироваться'
                        isDisabled={
                            phone.length >= 1 &&
                            email.length >= 1 &&
                            username.length >= 1 &&
                            isCheck
                        }/>
        </form>
    )
};

export default Register;