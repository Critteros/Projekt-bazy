import { Paper, type PaperProps } from '@mui/material';

export const ReservationCardContainer = ({ sx, children, ...paperProps }: PaperProps) => {
  return (
    <Paper
      sx={{
        aspectRatio: '2',
        flexBasis: '20vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        ...sx,
      }}
      {...paperProps}
    >
      {children}
    </Paper>
  );
};
