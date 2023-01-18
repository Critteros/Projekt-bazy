import { type ReactNode } from 'react';
import { Box } from '@mui/material';

type PageWrapperProps = {
  children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'block',
      }}
    >
      {children}
    </Box>
  );
};
