import { Dialog, type DialogProps } from '@mui/material';

export const AppDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog
      PaperProps={{
        variant: 'outlined',
        elevation: 0,
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
};
