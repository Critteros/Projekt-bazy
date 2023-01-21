import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export type DialogCloseButtonProps = {
  onClose: () => void;
};

export const DialogCloseButton = ({ onClose }: DialogCloseButtonProps) => {
  return (
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};
