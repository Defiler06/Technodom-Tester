import './ButtonForm.css';

interface IButtonFormProps {
    text: string;
    isDisabled: boolean;
}

const ButtonForm = (props: IButtonFormProps) => {
    return (
        <button type="submit" className='button_submit' disabled={!props.isDisabled}>{props.text}</button>
    )
};

export default ButtonForm;