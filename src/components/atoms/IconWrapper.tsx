import { type ReactNode } from 'react';
import { Box, type BoxProps } from '@mui/material';

type IconWrapperProps = {
  children: ReactNode;
} & BoxProps;

export const IconWrapper = ({ children, sx, ...props }: IconWrapperProps) => {
  return (
    <Box
      sx={{
        mr: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
