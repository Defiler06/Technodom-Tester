import './FormRegister.css'
import InputForm from "../../components/UI/InputForm/InputForm.tsx";
import {useAppSelector, useAppDispatch} from "../../store/hooks.ts";
import {changeCheckBox, changeEmail, changePhone, changeUsername} from "../../features/RegisterSlice.ts";
import React, {FormEvent, useState} from "react";
import validator from 'validator';
import ButtonForm from "../../components/UI/ButtonForm/ButtonForm.tsx";

const FormRegister = () => {
    const dispatch = useAppDispatch();
    const {username, email, phone, isCheck} = useAppSelector((state) => state.registerFields.user);

    const [phoneError, setPhoneError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');


    const formatedPhoneNumber = (phone: string) => {
        if (!phone) return phone;

        const phoneNumber = phone.replace(/[^\d]/g, '');
        const withPlusSeven = phoneNumber.startsWith('7');
        if (withPlusSeven) {
            console.log(phoneNumber)
            return `+7 ${phoneNumber.slice(1, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 9)} ${phoneNumber.slice(9, 11)}`;
        } else {
            console.log(phoneNumber)
            return `+7 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`;
        }
    };

    const submitLoginHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validator.isEmail(email) ? setEmailError('') : setEmailError('Невалидный email');

        const isPhoneValid = validator.isMobilePhone(phone);
        isPhoneValid || phone.length < 16 ? setPhoneError('Неправильный формат номера') : setPhoneError('');

        username.trim() === '' ? setUsernameError('Имя обязательное') : setUsernameError('');
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
                    dispatch(changeUsername(event.target.value));
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
                    console.log('e' + event.target.value)
                    const formatNumberPhone = formatedPhoneNumber(event.target.value);
                    dispatch(changePhone(formatNumberPhone));
                }}
                error={phoneError}
            />
            <InputForm
                label='Почта'
                name='email'
                placeholder='Email'
                value={email}
                onInputHandler={(event) => {
                    setEmailError('');
                    dispatch(changeEmail(event.target.value));
                }}
                error={emailError}
            />
            <label className="checkbox-container">
                <input type="checkbox" onChange={() => dispatch(changeCheckBox(!isCheck))}/>
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

export default FormRegister;