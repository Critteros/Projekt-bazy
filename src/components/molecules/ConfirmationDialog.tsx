import {
  Dialog,
  DialogTitle,
  DialogContent,
  type DialogProps,
  IconButton,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { AppButton } from '@/components/atoms/AppButton';

export type ConfirmationDialogProps = {
  onConfirm: () => void;
  onAbort?: () => void;
  title: string;
  message?: string;
  onClose?: () => void;
} & Omit<DialogProps, 'onClose'>;

export const ConfirmationDialog = ({
  onConfirm,
  onAbort,
  title,
  message,
  ...dialogProps
}: ConfirmationDialogProps) => {
  const { onClose } = dialogProps;

  const handleClose = () => {
    onClose?.();
    onAbort?.();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose?.();
  };

  return (
    <Dialog
      {...dialogProps}
      PaperProps={{
        variant: 'outlined',
      }}
    >
      <DialogTitle>
        <Typography variant={'h4'}>{title}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <AppButton variant={'outlined'} onClick={handleClose}>
          Abort
        </AppButton>
        <Button color={'error'} variant={'outlined'} onClick={handleConfirm}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
