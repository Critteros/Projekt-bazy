import type { ReactNode } from 'react';
import { Box } from '@mui/material';

export type DrawerContentProps = {
  children: ReactNode;
};

export const DrawerContent = ({ children }: DrawerContentProps) => {
  return (
    <Box
      overflow={'auto'}
      sx={{
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          backgroundColor: 'inherit',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'white',
          outline: '1px solid slategrey',
          borderRadius: '10px',
        },
      }}
    >
      {children}
    </Box>
  );
};
