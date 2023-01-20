import { type ReactNode } from 'react';
import { Box, Button } from '@mui/material';

import type { SxStyles } from '@/style/theme';

type CornerButtonProps = {
  children: ReactNode;
  sx?: SxStyles;
  onClick?: () => void;
};

const boxStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  m: 2,
  color: 'white',
} satisfies SxStyles;

export const CornerButton = ({ children, sx, onClick }: CornerButtonProps) => {
  return (
    <Box
      sx={{
        ...boxStyles,
        ...(sx ?? {}),
      }}
    >
      <Button onClick={onClick} sx={{ color: 'inherit' }}>
        {children}
      </Button>
    </Box>
  );
};
