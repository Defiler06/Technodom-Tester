import InputForm from "../../components/UI/InputForm/InputForm.tsx";
import {formatedPhoneNumber} from "../../helpers/formatedNumber.ts";
import ButtonForm from "../../components/UI/ButtonForm/ButtonForm.tsx";
import {FormEvent, useState} from "react";
import {useAppSelector} from "../../store/hooks.ts";
import validator from 'validator';
import {message} from "antd";

const RecoverPassword = () => {

    const [phoneNumber, setPhoneNumber] = useState<string>('+7');
    const [phoneError, setPhoneError] = useState<string>('');

    const correctPhoneNumber = useAppSelector((state) => state.loginFields.correctPhoneNumber);
    const submitLoginHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isPhoneValid = validator.isMobilePhone(phoneNumber);
        isPhoneValid || phoneNumber.length < 16 ? setPhoneError('Неправильный формат номера') : setPhoneError('');

        if (correctPhoneNumber === phoneNumber) {
            setPhoneNumber('');
            message.destroy();
            void message.success("Успешное восстановление пароля", 3);
        } else {
            message.destroy();
            void message.warning("Номер не найден", 3);
        }
    }

    return (
        <form className='form_register' onSubmit={(event) => submitLoginHandler(event)}>
            <p className='title_form'>Восстановление пароля</p>
            <InputForm
                label='Номер телефона'
                name='phone'
                placeholder='Номер телефона'
                type='tel'
                value={phoneNumber.split(' ').join(' ').trim()}
                onInputHandler={(event) => {
                    setPhoneError('');
                    const formatNumberPhone = formatedPhoneNumber(event.currentTarget.value);
                    setPhoneNumber(formatNumberPhone);
                }}
                error={phoneError}
            />
            <ButtonForm text='Восстановить' isDisabled={true}/>
        </form>
    )
};

export default RecoverPassword;
