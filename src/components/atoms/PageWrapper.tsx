import { type ReactNode } from 'react';
import { Box, type BoxProps } from '@mui/material';

type PageWrapperProps = {
  children: ReactNode;
  sx?: BoxProps['sx'];
};

export const PageWrapper = ({ children, sx }: PageWrapperProps) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
