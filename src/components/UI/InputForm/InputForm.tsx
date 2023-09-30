import './InputForm.css'
import {FormEvent} from "react";

interface IPropsInputForm {
    name: string;
    value: string;
    type?: string;
    placeholder: string;
    label: string;
    error: string;
    onInputHandler: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const InputForm = (props: IPropsInputForm) => {
    return (
        <div>
            <label className='title_input'>{props.label}</label>
            <input
                className='input_underline'
                type={props.type}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onInput={props.onInputHandler}
            />
            <div className="error-message" id="error-message">{props.error}</div>
        </div>
    )
};

export default InputForm;