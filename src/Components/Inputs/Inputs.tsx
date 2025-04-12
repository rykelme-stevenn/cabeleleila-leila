import TextField from '@mui/material/TextField';

export const EmailInput = ({ error, helperText, ...props }: any) => {
    return (
        <TextField
            label="E-mail"
            variant="outlined"
            className="w-full"
            error={!!error}
            helperText={error ? error.message : ''}
            {...props}
        />
    );
};
export const PasswordInput = ({ error, helperText, ...props }: any) => {
    return (
        <TextField
            label="Senha"
            type="password"
            autoComplete="current-password"
            className="w-full"
            error={!!error}
            helperText={error ? error.message : ''}
            {...props}
        />
    );
};