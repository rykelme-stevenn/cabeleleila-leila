import Button from '@mui/material/Button';

interface IButton {
    label: string;
    type: "button" | "submit" | "reset" | undefined;
    onPress?: () => void;
    color?: string;
}

export const PrimaryButton = ({label, type, onPress, color} : IButton) => {
    return (
        <Button id='primaryButton' className='w-full' type={type} variant="contained" onClick={() => onPress && onPress()} style={{backgroundColor: color}}>{label}</Button>
    )
}

export const SecondaryButton = ({label, type, onPress} : IButton) => {
    return (
        <Button id='secondaryButton' className='w-full' type={type} variant="outlined" onClick={() => onPress && onPress()}>{label}</Button>
    )
}