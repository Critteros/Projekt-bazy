import type { ReactNode } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { IconWrapper } from '@/components/atoms/IconWrapper';

export type CardBaseProps = {
  children: ReactNode;
  title: string;
  onClick?: () => void;
};

export const CardBase = ({ onClick, children, title }: CardBaseProps) => {
  return (
    <Button onClick={onClick}>
      <Paper>
        <Stack spacing={2} direction="column" alignItems="center" justifyContent={'center'}>
          <Box sx={{ m: 3, fontSize: '2rem' }}>
            <IconWrapper
              sx={{
                mb: '0.5em',
              }}
            >
              {children}
            </IconWrapper>
            <Typography sx={{ fontSize: '1em' }}>{title}</Typography>
          </Box>
        </Stack>
      </Paper>
    </Button>
  );
};
