import Button from '@mui/material/Button';

interface IButton {
    label: string;
    type: "button" | "submit" | "reset" | undefined;
}

export const PrimaryButton = ({label, type} : IButton) => {
    return (
        <Button id='primaryButton' className='w-full' type={type} variant="contained">{label}</Button>
    )
}