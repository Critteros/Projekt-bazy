import { type SyntheticEvent, useState, useEffect } from 'react';
import { Alert, Snackbar, type SnackbarCloseReason, type AlertProps } from '@mui/material';
import ms from 'ms';

type NotificationProps = {
  message: string | null | undefined;
  onClose?: () => void;
  timeToClose?: string;
} & Pick<AlertProps, 'severity'>;

export const Notification = ({ message, onClose, timeToClose, severity }: NotificationProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!message) return;
    setOpen(true);
  }, [message]);

  const handleClose = (event?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    onClose?.();
  };

  if (!message) {
    return <></>;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={ms(timeToClose ?? '2s')}
      onClose={handleClose}
      sx={{
        width: 400,
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
