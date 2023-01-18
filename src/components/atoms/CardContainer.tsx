import type { ReactNode } from 'react';
import { Grid } from '@mui/material';

export type CardContainerProps = {
  children: ReactNode;
  spacing?: number;
};

export const CardContainer = ({ children, spacing }: CardContainerProps) => {
  return (
    <Grid container spacing={spacing ?? 3} justifyContent={'center'}>
      {children}
    </Grid>
  );
};
