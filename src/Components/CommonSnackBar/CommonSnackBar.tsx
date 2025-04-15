import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type SnackBarType = {
  opened: boolean;
  handleClose: () => void;
  message: string;
  type: "error" | "info" | "success" | "warning";
}

const CommonSnackBar = ({ opened, handleClose, message, type }: SnackBarType) => {
  return (
    <Snackbar open={opened} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CommonSnackBar