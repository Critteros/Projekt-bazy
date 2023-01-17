import { type SyntheticEvent, useState, useEffect } from 'react';
import { Alert, Snackbar, type SnackbarCloseReason } from '@mui/material';
import ms from 'ms';

type ErrorNotificationProps = {
  error: string | null | undefined;
  onClose?: () => void;
  timeToClose?: string;
};

export const ErrorNotification = ({ error, onClose, timeToClose }: ErrorNotificationProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!error) return;
    setOpen(true);
  }, [error]);

  const handleClose = (event?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    onClose?.();
  };

  if (!error) {
    return <></>;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={ms(timeToClose ?? '6s')}
      onClose={handleClose}
      sx={{
        width: 400,
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={'error'} sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
